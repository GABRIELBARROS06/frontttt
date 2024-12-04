import React from 'react';
import styles from './PostagemCard.module.css'; // Importe um arquivo de estilos CSS para estilizar o card

function PostagemCard({ postagem }) {
  const { nome_professor, conteudo, data_postagem } = postagem;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.nomeProfessor}>{nome_professor}</h2>
        <p className={styles.dataPostagem}>{new Date(data_postagem).toLocaleDateString()}</p>
      </div>
      <div className={styles.conteudo}>
        <p>{conteudo}</p>
      </div>
    </div>
  );
}

export default PostagemCard;
