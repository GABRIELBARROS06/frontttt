import React from 'react'; // Adicione o import de useState
import styles from '../CSS/Chat.module.css'
import { useLocation } from 'react-router-dom';

const App = () => {

  const location = useLocation();
  const state = location.state?.dadosVideo;

  console.log(state);
  

  return (
    <div className={styles.container}>
      <div className={styles.mainVideo}>
        <h1>20 SINAIS BÁSICOS PARA FALAR UTILIZANDO A LIBRAS!</h1>
        <div className={styles.professorInfo}>
          <img 
            src="path-to-professor-image.jpg" 
            alt="" 
            className={styles.professorAvatar}
          />
          <div className={styles.professorDetails}>
            <p><strong>Profª Débora</strong></p>
            <span className={styles.labelProfessor}>Professor</span>
            <span className={styles.dot}></span>
          </div>
          <div className={styles.dat}>
            <p>03/04/24</p>
          </div>
        </div>

        <div className="description">
          <h1>Quer aprender Libras de forma prática e rápida?
             Neste vídeo, você vai descobrir 
             20 sinais básicos que vão te ajudar a ter uma 
             comunicação simples e eficaz com qualquer pessoa surda. 
             Ao acompanhar os sinais junto comigo,
             você já começa a praticar e memorizar! 🚀</h1>
        </div>
      </div>
    </div>
  );
};



export default App;