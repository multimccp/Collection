import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Update = ({ carId, onClose, onUpdateSuccess }) => {
    const [car, setCar] = useState({
        model: "",
        brand: "",
        color: "",
        year: "",
        diecastBrand: "",
        collection: "",
        condition: "",
        img: "",
        edition: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/cars/${carId}`);
                setCar(res.data);
                setLoading(false);
            } catch (err) {
                setError("Erro ao carregar dados do carro");
                setLoading(false);
                console.log(err);
            }
        };

        if (carId) {
            fetchCar();
        }
    }, [carId]);

    const handleChange = (e) => {
        setCar(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8800/cars/${carId}`, car);
            onUpdateSuccess();
            onClose();
        } catch (err) {
            console.log(err);
            setError("Erro ao atualizar o carro");
        }
    };

    if (loading) return <div className="loading">Carregando...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="update-modal">
            <div className="update-content">
                <div className="update-header">
                    <h2>Editar Carro</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Modelo:</label>
                        <input
                            type="text"
                            name="model"
                            value={car.model}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Marca:</label>
                        <input
                            type="text"
                            name="brand"
                            value={car.brand}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Cor:</label>
                        <input
                            type="text"
                            name="color"
                            value={car.color}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Ano:</label>
                        <input
                            type="number"
                            name="year"
                            value={car.year}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Marca do Diecast:</label>
                        <input
                            type="text"
                            name="diecastBrand"
                            value={car.diecastBrand}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Coleção:</label>
                        <input
                            type="text"
                            name="collection"
                            value={car.collection}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Status:</label>
                        <input
                            type="text"
                            name="condition"
                            value={car.condition}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>URL da Imagem:</label>
                        <input
                            type="text"
                            name="img"
                            value={car.img || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>URL da Imagem:</label>
                        <input
                            type="text"
                            name="edition"
                            value={car.edition || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-buttons">
                        <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="update-btn">Atualizar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Update;