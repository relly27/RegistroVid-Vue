<template>

        <div class="login-container">
            <form class="login-form" @submit.prevent="handleLogin">
                <h1>Acceso</h1>
                <div class="form-input-material">
                    <input type="text" name="username" id="username" placeholder=" " autocomplete="off"
                        class="form-control-material" v-model="username" required />
                    <label for="username">Nombre de usuario</label>
                </div>
                <div class="form-input-material">
                    <input type="password" name="password" id="password" placeholder=" " autocomplete="off"
                        class="form-control-material" v-model="password" required />
                    <label for="password">Contraseña</label>
                </div>
                <button type="submit" class="btn btn-primary btn-ghost">Login</button>
            </form>
        </div>
        
</template>

<script>
import Swal from "sweetalert2";

export default {
    name: "Login",
    data() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        handleLogin() {
            if (this.username === "Admin" && this.password === "Fund4b1t#2025") {
                Swal.fire({
                    title: "¡Inicio exitoso!",
                    icon: "success",
                });
                sessionStorage.setItem('accessGranted', 'true');
                setTimeout(() => {
                    this.$router.push('/dashboard'); // Redirección usando Vue Router
                }, 1000);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Ups...",
                    text: "¡Usuario o contraseña inválida!",
                });
            }
        },
    },
};
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/gh/alphardex/aqua.css@master/dist/aqua.min.css");

.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    /* background: #eceffc; */
}

.btn {
    padding: 8px 20px;
    border-radius: 0;
    overflow: hidden;
    background: #244e82;
}

.btn::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, transparent, var(--primary-color), transparent);
    transform: translateX(-100%);
    transition: 0.6s;
}

.btn:hover {
    background: transparent;
    box-shadow: 0 0 20px 10px rgba(51, 152, 219, 0.5);
}

.btn:hover::before {
    transform: translateX(100%);
}

.form-input-material {
    --input-default-border-color: white;
    --input-border-bottom-color: white;
    width: 80%;
}

.form-input-material input {
    color: white;
    width: 100%;
}

.login-form {
    display: flex;
    width: 50%;
    flex-direction: column;
    align-items: center;
    padding: 50px 40px;
    color: white;
    background: #0d0d0d;
    border-radius: 10px;
    box-shadow: 0 0.4px 0.4px rgba(128, 128, 128, 0.109),
        0 1px 1px rgba(128, 128, 128, 0.155), 0 2.1px 2.1px rgba(128, 128, 128, 0.195),
        0 4.4px 4.4px rgba(128, 128, 128, 0.241), 0 12px 12px rgba(128, 128, 128, 0.35);
}

.login-form h1 {
    margin: 0 0 24px 0;
}

.login-form .form-input-material {
    margin: 12px 0;
}

.login-form .btn {
    width: 100%;
    margin: 18px 0 9px 0;
}
</style>