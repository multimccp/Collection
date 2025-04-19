import React, { useEffect, useState } from "react";
import axios from "axios";
import Update from "./Update";
import FilterSortComponent from "./FilterSort";

const Cars = ({ viewMode }) => {
    const [cars, setCars] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedCarId, setSelectedCarId] = useState(null);
    const [displayedCars, setDisplayedCars] = useState({ grouped: false, cars: [] });

    const fetchAllCars = async () => {
        try {
            const res = await axios.get("http://localhost:8800/cars");
            setCars(res.data);
            setDisplayedCars({ grouped: false, cars: res.data });
        } catch(err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchAllCars();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8800/cars/" + id);
            // Atualiza a lista após excluir
            fetchAllCars();
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = (id) => {
        setSelectedCarId(id);
        setShowUpdateModal(true);
    };

    const closeUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedCarId(null);
    };

    const handleFilterChange = (filteredData) => {
        setDisplayedCars(filteredData);
    };

    // Determina o layout de cada carro baseado no modo de visualização
    const renderCarContent = (car, isListView) => {
        if (isListView) {
            return (
                <>
                    {car.img && <img src={car.img} alt="" />}
                    <div className="car-info">
                        <h2>{car.brand} {car.model}</h2>
                        <p>Color: {car.color}</p>
                        <p>Year: {car.year}</p>
                        <p>Condition: {car.condition}</p>
                        <p>Collection: {car.collection}</p>
                        <p>Brand: {car.diecastBrand}</p>
                        <p>Edition: {car.edition}</p>
                        <div className="car-actions">
                            <button 
                                className="edit-btn" 
                                onClick={() => handleUpdate(car.idcars)}
                            >
                                Editar
                            </button>
                            <button 
                                className="delete-btn" 
                                onClick={() => handleDelete(car.idcars)}
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </>
            );
        }
        
        return (
            <>
                {car.img && <img src={car.img} alt="" />}
                <h2>{car.brand}</h2>
                <h2>{car.model}</h2>
                <p>Cor: {car.color}</p>
                <p>Ano: {car.year}</p>
                <p>Status: {car.condition}</p>
                <p>Coleção: {car.collection}</p>
                <p>Marca: {car.diecastBrand}</p>
                <div className="car-buttons">
                    <button 
                        className="edit-btn" 
                        onClick={() => handleUpdate(car.idcars)}
                    >
                        Editar
                    </button>
                    <button 
                        className="delete-btn" 
                        onClick={() => handleDelete(car.idcars)}
                    >
                        Excluir
                    </button>
                </div>
            </>
        );
    };

    const isListView = viewMode === 'view-list' || viewMode === 'view-list-two';

    // Render cars grouped or not grouped based on filter results
    const renderCars = () => {
        if (displayedCars.grouped) {
            return Object.entries(displayedCars.groups).map(([groupName, groupCars]) => (
                <div key={groupName} className="car-group">
                    <h2 className="group-header">{groupName}</h2>
                    <div className={`cars ${viewMode}`}>
                        {groupCars.map(car => (
                            <div className="car" key={car.idcars || car.id}>
                                {renderCarContent(car, isListView)}
                            </div>
                        ))}
                    </div>
                </div>
            ));
        } else {
            return (
                <div className={`cars ${viewMode}`}>
                    {displayedCars.cars.map(car => (
                        <div className="car" key={car.idcars || car.id}>
                            {renderCarContent(car, isListView)}
                        </div>
                    ))}
                </div>
            );
        }
    };

    return (
        <div>
            <h1>Car collection</h1>
            <FilterSortComponent cars={cars} onFilterChange={handleFilterChange} />
            
            {renderCars()}
            
            {showUpdateModal && (
                <Update 
                    carId={selectedCarId} 
                    onClose={closeUpdateModal} 
                    onUpdateSuccess={fetchAllCars} 
                />
            )}
        </div>
    );
};

export default Cars;