import React, { useState, useEffect, useContext } from "react";
import{Link} from "react-router-dom"
import "./styles.css";
import Nav from "./Nav";
import Search from "./Search";
import Repositories from "./Repositories";
import { getRepositories, createRepository, destroyRepository } from "../../services/api";
import { AuthContext } from "../../Contexts/auth";

const MainPage = () => {
  const { user, logout }  = useContext(AuthContext)
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true)
  const [loadingError, setloadingError] = useState(false)

  const loadData = async (query ="") => {
      try {
        setLoading(true)
        const response = await getRepositories(user?.id, query);
        setRepositories(response.data);
        setLoading(false)
    } catch (err) {
        setloadingError(true)
        
    }

  };

  useEffect(() => {
      (async () => await loadData())();
  });
  const handleLogout = () => {
    console.log("logout");
    logout();
  };

  const handleSearch = (query) => {
    loadData(query);
  };

  const handleDelete = async (repository) => {
    console.log("delete", repository);
    await destroyRepository(user?.id, repository._id)
    await loadData();
    
  };

  const handleNewRepo = async(url) => {
    console.log("New repository", url);
    try {
        await createRepository(user?.id, url);
        await loadData();
} catch (err) {
        console.log(err);
        setloadingError(true)
    }
  };

  if (loadingError) {
      return(
        <div className="loading">Falha no Carregamento de repositorios...<Link to='/login'>Voltar</Link>
        </div>  
      )
  }
  if (loading) {
      return(
        <div className="loading">Carregando...</div>  
      )
  }

  return (
    <div id="main">
      <Nav onLogout={handleLogout} />
      <Search onSearch={handleSearch} />
      <Repositories
        repositories={repositories}
        onDelete={handleDelete}
        onNewRepo={handleNewRepo}
      />
    </div>
  );
};

export default MainPage;
