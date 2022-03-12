import axiosConfig from '../configs/axiosConfig';

const loginAPI = ({ email, password }) => {
    return axiosConfig.post("/api/login-token", { email, password });
}

const registerAPI = ({ email, password }) => {
    return axiosConfig.post("/api/register", { email, password });
}

const changePasswordAPI = ({ id, password, newPassword }) => {
    return axiosConfig.put("/api/change-password", { id, password, newPassword });
}

const forgotPasswordAPI = ({ email }) => {
    return axiosConfig.put("/api/forgot-password", { email });
}

const logoutAPI = () => {
    return axiosConfig.get("/api/logout");
}

// User
const getAllUsersAPI = () => {
    return axiosConfig.get("/api/get-all-users");
}

const createUserAPI = (data) => {
    return axiosConfig.post("/api/create-new-user", data);
}

const deleteUserAPI = (id) => {
    return axiosConfig.delete("/api/delete-user", {
        data: {
            id: id
        }
    });
}

const updateUserAPI = (data) => {
    return axiosConfig.put("/api/update-user", data);
}

const getUserByIDAPI = (id) => {
    return axiosConfig.get(`/api/get-user-by-id?id=${id}`);
}

// Type Of Handbook
const getAllTypeAPI = (page) => {
    return axiosConfig.get(`/api/get-all-type-of-handbook?page=${page}`);
}

const createTypeAPI = (data) => {
    return axiosConfig.post("/api/create-type", data);
}

const deleteTypeAPI = (id) => {
    return axiosConfig.delete("/api/delete-type", {
        data: {
            id: id
        }
    });
}

const updateTypeAPI = (data) => {
    return axiosConfig.put("/api/update-type", data);
}

// Handbook
const getAllHandbooksAPI = (limit) => {
    return axiosConfig.get(`/api/get-all-handbooks?limit=${limit}`);
}

const getHandbookByIDAPI = (id) => {
    return axiosConfig.get(`/api/get-handbook-by-id?id=${id}`);
}

const createHandbookAPI = (data) => {
    return axiosConfig.post("/api/create-handbook", data);
}

const deleteHandbookAPI = (id) => {
    return axiosConfig.delete("/api/delete-handbook", {
        data: {
            id: id
        }
    });
}

const updateHandbookAPI = (data) => {
    return axiosConfig.put("/api/update-handbook", data);
}

// Author
const getAllAuthorsAPI = (limit) => {
    return axiosConfig.get(`/api/get-all-authors?limit=${limit}`);
}

const getAuthorByIDAPI = (id) => {
    return axiosConfig.get(`/api/get-author-by-id?id=${id}`);
}

const createAuthorAPI = (data) => {
    return axiosConfig.post("/api/create-author", data);
}

const deleteAuthorAPI = (id) => {
    return axiosConfig.delete("/api/delete-author", {
        data: {
            id: id
        }
    });
}

const updateAuthorAPI = (data) => {
    return axiosConfig.put("/api/update-author", data);
}

// Store
const getAllStoresAPI = (limit) => {
    return axiosConfig.get(`/api/get-all-stores?limit=${limit}`);
}

const createStoreAPI = (data) => {
    return axiosConfig.post("/api/create-store", data);
}

const deleteStoreAPI = (id) => {
    return axiosConfig.delete("/api/delete-store", {
        data: {
            id: id
        }
    });
}

const updateStoreAPI = (data) => {
    return axiosConfig.put("/api/update-store", data);
}

const getStoreByIDAPI = (id) => {
    return axiosConfig.get(`/api/get-store-by-id?id=${id}`);
}

// Publisher
const getAllPublishersAPI = (limit) => {
    return axiosConfig.get(`/api/get-all-publishers?limit=${limit}`);
}

const createPublisherAPI = (data) => {
    return axiosConfig.post("/api/create-publisher", data);
}

const deletePublisherAPI = (id) => {
    return axiosConfig.delete("/api/delete-publisher", {
        data: {
            id: id
        }
    });
}

const updatePublisherAPI = (data) => {
    return axiosConfig.put("/api/update-publisher", data);
}

const getPublisherByIDAPI = (id) => {
    return axiosConfig.get(`/api/get-publisher-by-id?id=${id}`);
}

// Language
const getAllLanguagesAPI = () => {
    return axiosConfig.get("/api/get-all-languages");
}

const createLanguageAPI = (data) => {
    return axiosConfig.post("/api/create-language", data);
}

const deleteLanguageAPI = (id) => {
    return axiosConfig.delete("/api/delete-language", {
        data: {
            id: id
        }
    });
}

const updateLanguageAPI = (data) => {
    return axiosConfig.put("/api/update-language", data);
}

// Book
const createBookAPI = (data) => {
    return axiosConfig.post("/api/create-book", data);
}

const deleteBookAPI = (id) => {
    return axiosConfig.delete("/api/delete-book", {
        data: {
            id: id
        }
    })
}

export {
    loginAPI, registerAPI, logoutAPI, getAllUsersAPI, forgotPasswordAPI,
    createUserAPI, deleteUserAPI, updateUserAPI, changePasswordAPI,
    getUserByIDAPI, getAllTypeAPI, createTypeAPI, deleteTypeAPI, updateTypeAPI,
    getAllHandbooksAPI, createHandbookAPI, updateHandbookAPI, deleteHandbookAPI, getHandbookByIDAPI,
    createAuthorAPI, updateAuthorAPI, getAllAuthorsAPI, getAuthorByIDAPI, deleteAuthorAPI,
    createStoreAPI, updateStoreAPI, getAllStoresAPI, deleteStoreAPI, getStoreByIDAPI,
    createPublisherAPI, updatePublisherAPI, getAllPublishersAPI, deletePublisherAPI, getPublisherByIDAPI,
    createLanguageAPI, updateLanguageAPI, deleteLanguageAPI, getAllLanguagesAPI,
    createBookAPI, deleteBookAPI, 
}