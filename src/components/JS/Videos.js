import React from 'react';
import styles from '../CSS/Videos.module.css';
import { useLocation } from 'react-router-dom';

const ModernVideo = () => {
  const location = useLocation();
  const state = location.state?.dadosVideo;

  if (!state) {
    return <p className={styles.error}>Dados do vídeo não disponíveis.</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.videoCard}>
        {/* Título */}
        <h1 className={styles.title}>{state.titulo}</h1>

        {/* Vídeo */}
        <div className={styles.videoContainer}>
          <video controls className={styles.videoPlayer}>
            <source src={state.url_video} type="video/mp4" />
            Seu navegador não suporta a reprodução de vídeos.
          </video>
        </div>

        {/* Informações do Professor */}
        <div className={styles.professorInfo}>
          <img
            src="path-to-professor-image.jpg" // Substituir por state.professor[0]?.foto
            alt="Professor"
            className={styles.professorAvatar}
          />
          <div className={styles.professorDetails}>
            <p className={styles.professorName}>
              {state.professor[0]?.nome || 'Profº Desconhecido'}
            </p>
            <span className={styles.professorRole}>
              {state.professor[0]?.cargo || 'Professor'}
            </span>
          </div>
        </div>

        {/* Data */}
        <span className={styles.date}>
          {new Date(state.data).toLocaleDateString()}
        </span>

        {/* Descrição */}
        <div className={styles.description}>
          <p>{state.descricao}</p>
        </div>

        {/* Comentários */}
        <div className={styles.commentSection}>
          <h2 className={styles.commentTitle}>Comentários</h2>
          <div className={styles.commentCard}>
            <textarea
              className={styles.commentInput}
              placeholder="Deixe seu comentário aqui..."
            />
            <button className={styles.commentButton}>Enviar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernVideo;
