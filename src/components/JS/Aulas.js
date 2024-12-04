import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../CSS/Aulas.module.css";

function Aulas() {
  const BASE_URL = 'http://localhost:8080'; // Corrigido sem a barra final
  const navigate = useNavigate();

  const [modulos, setModulos] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [selectedModulo, setSelectedModulo] = useState(null);

  // Buscar Módulos
  useEffect(() => {
    async function buscarModulos() {
      try {
        const response = await fetch(`${BASE_URL}/v1/sinalibras/modulos`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Módulos recebidos:", data);

        console.log(data);
        if (data.modulo.length > 0) {
          console.log(data);
          setModulos(data.modulo);
          setSelectedModulo(data[0].id_modulo);
        } else {
          console.warn("Nenhum módulo encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar módulos:", error);
      }
    }

    buscarModulos();
  }, []);

  // Buscar Aulas do Módulo Selecionado
  useEffect(() => {
    if (selectedModulo) {
      async function buscarAulas() {
        try {
          const response = await fetch(`${BASE_URL}/v1/sinalibras/videos/modulo/${selectedModulo}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
          }

          const data = await response.json();

          if(data){
            console.log(data);
            
          }
          console.log("Aulas recebidas:", data.videos);
          if (data.videos.length > 0) {
            console.log('jwoejfioeoiiofiorejogfjroe');
            
            console.log(data.videos);
            setAulas(data.videos);
          } else {
            console.warn("Nenhuma aula encontrada para o módulo selecionado!");
            setAulas([]); // Limpar aulas caso não haja
          }
        } catch (error) {
          console.error("Erro ao buscar aulas:", error);
          setAulas([]); // Limpar aulas em caso de erro
        }
      }

      buscarAulas();
    }
  }, [selectedModulo]);

  console.log(modulos);
  console.log(aulas);
  
  
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Aulas</h1>
        <button onClick={() => navigate("/Home")} className={styles.backButton}>
          Voltar
        </button>
      </header>

      {/* Seleção de Módulos */}
      <div className={styles.modules}>
        { modulos.length > 0 ? (
                  modulos.map((modulo) => (
                    <button
                      key={modulo.id_modulo}
                      className={`${styles.moduleButton} ${
                        selectedModulo === modulo.id_modulo ? styles.active : ""
                      }`}
                      onClick={() => setSelectedModulo(modulo.id_modulo)}
                    >
                      {modulo.modulo}
                    </button>
                  ))
        ) : (
          <>carregando</>
        )}

      </div>

      <div className={styles.lessonsGrid}>
        {aulas.length > 0 ? (
          aulas.map((aula) => (            
            <div key={aula.id_videoaula} className={styles.lessonCard} onClick={() => navigate('/Videos', { state: { dadosVideo: aula } })}>
              <img
                src={aula.foto_capa || "https://via.placeholder.com/150"}
                alt={aula.titulo}
                className={styles.lessonImage}
              />
              <div className={styles.lessonDetails}>
                <p><strong>Professor:</strong> {aula.professor[0].nome}</p>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noLessons}>Nenhuma aula disponível para este módulo.</p>
        )}
      </div>
    </div>
  );
}

export default Aulas;
