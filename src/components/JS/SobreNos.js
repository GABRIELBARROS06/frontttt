import React, { useContext } from "react";
import styles from "../CSS/SobreNos.module.css";
import catIcon from "../../img/Cat.png";
import userIcon from "../../img/Junin.png";
import logo from "../../img/logoGrande.png";
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

function SobreNos() {
    const { dados } = useContext(AppContext);
    console.log(dados);

    const navigate = useNavigate();
    return (
        <div className={styles.body}>
            {/* Header */}
            <header className={styles.header}>
                <button className={styles.backButton} onClick={() => navigate('/C')}>
                    &#8592;
                </button>
                <h1>Sobre Nós</h1>
                <button className={styles.donateButton} onClick={() => navigate('/Doacao')}>
                    Doar
                </button>
            </header>

            {/* Mensagens */}
            <div className={styles.container}>
                <div className={styles.speechBubble}>
                    <img src={catIcon} alt="Ícone do gato" className={styles.icon} />
                    <div className={styles.bubble}>
                        <p>
                            Olá, nós somos o SinaLibras!! Somos uma comunidade online que
                            conecta pessoas surdas e ouvintes.
                        </p>
                    </div>
                </div>

                <div className={styles.speechBubbleRight}>
                    <div className={styles.bubble}>
                        <p>
                            Nossa missão é promover a inclusão e a valorização da cultura
                            surda, através de ferramentas e recursos que facilitam a
                            comunicação e a interação entre as pessoas.
                        </p>
                    </div>
                    <img src={userIcon} alt="Ícone do usuário" className={styles.icon} />
                </div>
            </div>

            {/* Footer */}
            <footer className={styles.footer}>
                <img src={logo} alt="Logo SinaLibras" />
            </footer>
        </div>
    );
}

export default SobreNos;
