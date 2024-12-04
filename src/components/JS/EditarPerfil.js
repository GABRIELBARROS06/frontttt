import { FaArrowLeft, FaRegCalendarAlt, FaChevronRight } from "react-icons/fa";
import styles from "../CSS/EditarPerfil.module.css";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

const EditarPerfil = () => {
  const BASE_URL = "http://localhost:8080/";
  const { setDados, dados } = useContext(AppContext);

  const [nome, setNome] = useState(dados?.nome || "");
  const [email, setEmail] = useState(dados?.email || "");
  const [data_nasc, setDataNascimento] = useState(dados?.data_nascimento || "");
  const [fotoPerfil, setFotoPerfil] = useState(null);

  const navigate = useNavigate();

  console.log(dados);

  useEffect(() => {
    if (!dados || !dados.id) {
      alert("Erro: Dados do usuário não foram carregados.");
      navigate("/login");
    }
  }, [dados, navigate]);

  const salvarAlteracoes = async () => {
    if (!dados || !dados.id) {
      alert("Erro: Dados do usuário não carregados corretamente.");
      return;
    }
  
    const alunoDados = {
      nome,
      email,
      data_nascimento: data_nasc,
      foto_perfil: fotoPerfil ? URL.createObjectURL(fotoPerfil) : null, // Envie como URL se necessário
    };
  
    try {
      const response = await fetch(`${BASE_URL}v1/sinalibras/aluno/${dados.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alunoDados),
      });
  
      if (response.ok) {
        const data = await response.json();
        setDados({ ...dados, nome, email, data_nascimento: data_nasc });
        alert("Perfil atualizado com sucesso!");
        navigate("/perfil");
      } else {
        const errorData = await response.json();
        alert(`Erro ao atualizar perfil: ${errorData.message || "Detalhes não fornecidos"}`);
      }
    } catch (error) {
      console.error("Erro ao salvar as alterações:", error);
      alert("Erro ao salvar as alterações!");
    }
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoPerfil(file);
    }
  };

  return (
    <div className={styles.editarPerfilContainer}>
      <header className={styles.editarPerfilHeader}>
        <button
          className={styles.voltarButton}
          onClick={() => navigate("/Perfil")}
        >
          <FaArrowLeft size={20} />
        </button>
        <h1>Editar Perfil</h1>
      </header>

      <div className={styles.fotoPerfil}>
        <img
          src={fotoPerfil ? URL.createObjectURL(fotoPerfil) : dados?.foto_perfil || "https://via.placeholder.com/100"}
          alt="Foto do Perfil"
          className={styles.foto}
        />
        <input
          type="file"
          accept="image/*"
          className={styles.uploadInput}
          onChange={handleImageChange}
        />
      </div>

      <form className={styles.formulario}>
        <div className={styles.inputGroup}>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="dataNasc">Data de Nascimento</label>
          <div className={styles.inputWrapper}>
            <input
              type="date"
              id="dataNasc"
              name="dataNasc"
              value={data_nasc}
              onChange={(e) => setDataNascimento(e.target.value)}
            />
            <FaRegCalendarAlt className={styles.inputIcon} size={20} />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="button" className={styles.alterarSenhaButton}>
          Alterar Senha <FaChevronRight size={16} />
        </button>
      </form>

      <button className={styles.salvarButton} onClick={salvarAlteracoes}>
        Salvar Alterações
      </button>
    </div>
  );
};

export default EditarPerfil;
