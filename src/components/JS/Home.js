import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import React from 'react';
import { FiSettings, FiBell, FiChevronDown } from 'react-icons/fi';
import { FaHeart, FaComment } from 'react-icons/fa';
import styles from '../CSS/Home.module.css';
import logo from '../../img/logoGrande.png';
import chat from '../../img/chat.png';
import atividades from '../../img/atividades.png';
import aulas from '../../img/videoAula.png';
import ranking from '../../img/Rank.png';
import pesquisar from '../../img/pesquisar.png';

function Home() {
    const { dados } = useContext(AppContext);
    const navigate = useNavigate();

    const [isCardVisible, setCardVisible] = useState(false);
    const [postagens, setPostagens] = useState([]);
    const [comentarios, setComentarios] = useState([]);
    const [novoComentario, setNovoComentario] = useState('');
    const [comentarioAberto, setComentarioAberto] = useState(null);

    // Fetch postagens
    async function buscarPostagens() {
        try {
            const response = await fetch('http://localhost:8080/v1/sinalibras/feed');
            const data = await response.json();
            if (response.ok && Array.isArray(data.feed)) {
                setPostagens(data.feed);
            }
        } catch (error) {
            console.error('Erro ao buscar postagens:', error);
        }
    }

    // Fetch comentarios
    async function buscarComentarios(idPostagem) {
        try {
            const response = await fetch(`http://localhost:8080/v1/sinalibras/postagem/comentarios/${idPostagem}`);
            const data = await response.json();
            if (response.ok && Array.isArray(data.comentarios)) {
                setComentarios(data.comentarios);
            }
        } catch (error) {
            console.error('Erro ao buscar comentários:', error);
        }
    }

    // Add comentario
    async function adicionarComentario(idPostagem, comentarioTexto) {
        try {
            const comentario = {
                comentario: comentarioTexto,
                id_postagem: idPostagem,
                id_aluno: dados?.id || 0,
            };
            const response = await fetch('http://localhost:8080/v1/sinalibras/postagem/comentario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comentario),
            });
            if (response.ok) {
                buscarComentarios(idPostagem);
            }
        } catch (error) {
            console.error('Erro ao adicionar comentário:', error);
        }
    }

    useEffect(() => {
        buscarPostagens();
    }, []);

    return (
        <div className={styles.container}>
            {/* HEADER */}
            <header className={styles.header}>
                <img src={logo} alt="Logo SinaLibras" className={styles.logo} />
                <div className={styles.headerRight}>
                    <FiSettings className={styles.icon} onClick={() => navigate('/Configuracoes')} />
                    <FiBell className={styles.icon} />
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>{dados?.nome || 'Usuário'}</span>
                        <img
                            src={dados?.foto_perfil || '/default-profile.jpg'}
                            alt="Foto de Perfil"
                            onClick={() => navigate('/Perfil')}
                            className={styles.profileImage}
                        />
                        <FiChevronDown className={styles.arrowDown} onClick={() => setCardVisible((prev) => !prev)} />
                    </div>
                </div>
            </header>

            {isCardVisible && (
                <div className={styles.dropdownCard}>
                    <div className={styles.cardOption} onClick={() => navigate('/Perfil')}>Perfil</div>
                    <div className={styles.cardOption} onClick={() => navigate('/Configuracoes')}>Configurações</div>
                    <div className={styles.cardOption} onClick={() => navigate('/Login')}>Sair</div>
                </div>
            )}

            {/* BARRA LATERAL */}
            <aside className={styles.sidebar}>
                <div className={styles.navItem} onClick={() => navigate('/Perfil')}>
                    <img src={chat} alt="Chat" />
                    <span>Perfil</span>
                </div>
                <div className={styles.navItem} onClick={() => navigate('/VideoChat')}>
                    <img src={atividades} alt="Atividades" />
                    <span>Chat</span>
                </div>
                <div className={styles.navItem} onClick={() => navigate('/Aulas')}>
                    <img src={aulas} alt="Aulas" />
                    <span>Aulas</span>
                </div>
                <div className={styles.navItem} onClick={() => navigate('/Ranking')}>
                    <img src={ranking} alt="Ranking" />
                    <span>Ranking</span>
                </div>
            </aside>

            {/* CONTEÚDO CENTRAL */}
            <main className={styles.mainContent}>
                <div className={styles.searchBar}>
                    <img src={pesquisar} alt="Pesquisar" />
                    <input type="text" placeholder="Pesquisar..." />
                </div>
                <div className={styles.postagens}>
                    {postagens.map((postagem) => (
                        <div key={postagem.id} className={styles.cardPostagem}>
                            <div className={styles.cardHeader}>
                                <img src={postagem.professor?.foto || '/default-profile.jpg'} alt="Foto do Professor" className={styles.postProfessorFoto} />
                                <h3>{postagem.professor?.nome || 'Professor Desconhecido'}</h3>
                            </div>
                            <p className={styles.postContent}>{postagem.conteudo}</p>
                            {postagem.foto && <img src={postagem.foto} alt="Imagem da postagem" className={styles.postImage} />}
                            <span className={styles.postDate}>{new Date(postagem.data).toLocaleDateString()}</span>
                            <div className={styles.cardButtonsContainer}>
                                <button className={styles.cardButton}><FaHeart /></button>
                                <button className={styles.cardButton} onClick={() => setComentarioAberto(postagem.id)}><FaComment /></button>
                            </div>
                            {comentarioAberto === postagem.id && (
                                <div className={styles.comentarios}>
                                    {comentarios.map((comentario) => (
                                        <div key={comentario.id} className={styles.comentario}>
                                            <span>{comentario.usuario?.nome || 'Usuário'}</span>
                                            <p>{comentario.texto}</p>
                                        </div>
                                    ))}
                                    <textarea
                                        value={novoComentario}
                                        onChange={(e) => setNovoComentario(e.target.value)}
                                        placeholder="Digite seu comentário..."
                                    />
                                    <button onClick={() => adicionarComentario(postagem.id, novoComentario)}>Enviar</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Home;
