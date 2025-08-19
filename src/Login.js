import styles from './Login.module.css'
import logo from './imagens/LogoGastroFlow.png';

export default function Login() {
    return(
        <div className={styles.container}>
            <div className={styles.card}>
                <section className={styles.imagem}>
                    <img src={logo} alt="Logo GastroFlow" />
                </section>
                <form className={styles.form}>
                    <input placeholder='Usuário'></input>
                    <input placeholder='Senha'></input>
                    <button>Entrar</button>
                </form>
                <p className={styles.texto}>Cadastrar novo usuário</p>
            </div>
        </div>
    );
}
