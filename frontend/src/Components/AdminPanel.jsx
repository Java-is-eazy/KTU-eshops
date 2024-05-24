import React, { useState } from "react";
import PropTypes from "prop-types";

const AdminPanel = ({ isAdmin }) => {
    const [isProductModalOpen, setProductModalOpen] = useState(false);
    const [isUserModalOpen, setUserModalOpen] = useState(false);

    const handleManageProducts = () => {
        setProductModalOpen(true);
    };

    const handleManageUsers = () => {
        setUserModalOpen(true);
    };

    const closeModal = () => {
        setProductModalOpen(false);
        setUserModalOpen(false);
    };

    return (
        <div className="user-profile-container">
            {isAdmin ? (
                <div className="user-profile-content">
                    <h2>Admin Panel</h2>
                    <p>Here you can manage the products and users of the webshop.</p>
                    <div className="admin-panel-buttons">
                        <button style={{ margin: "0.5em" }} className="submit-btn" onClick={handleManageProducts}>
                            Manage Products
                        </button>
                        <button style={{ margin: "0.5em" }} className="submit-btn" onClick={handleManageUsers}>
                            Manage Users
                        </button>
                    </div>
                </div>
            ) : (
                <div className="user-profile-content">
                    <h2>Restricted Access</h2>
                    <p>You do not have permission to access the admin panel.</p>
                </div>
            )}

            {isProductModalOpen && (
                <div className="modal-window">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Manage Products</h2>
                        <p>Placeholder text for product management.</p>
                    </div>
                </div>
            )}

            {isUserModalOpen && (
                <div className="modal-window">
                    <div className="modal-content">
                        <span style={{ height: "1em" }} className="close" onClick={closeModal}>&times;</span>
                        <h2>Manage Users</h2>
                        <p>Placeholder text for user management.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

AdminPanel.propTypes = {
    isAdmin: PropTypes.bool.isRequired
};

export default AdminPanel;
