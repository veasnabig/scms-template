<template>
<div class="login-wrapper">
    <img src="../../assets/H2E-Edu.png" class="logo">
    <span class="system-name">ប្រព័ន្ធគ្រប់គ្រងការបណ្តុះបណ្តាលវគ្គខ្លី</span>
    <span class="title">ចូលប្រើប្រាស់</span>

    <form novalidate class="md-layout" @submit.prevent="validateUser">
        <div class="md-layout-item md-size-20 username-wrapper">
            <md-field :class="getValidationClass('username')">
                <label class="md-label">ឈ្មោះអ្នកប្រើប្រាស់</label>
                <md-input v-model="form.username" />
                <span class="md-error" v-if="!$v.form.username.required">ឈ្មោះអ្នកប្រើប្រាស់ តម្រូវឱ្យបំពេញ</span>
            </md-field>
        </div>
        <div class="md-layout-item md-size-20 password-wrapper">
            <md-field :class="getValidationClass('password')">
                <label class="md-label">ពាក្យសម្ងាត់</label>
                <md-input type="password" v-model="form.password" />
                <span class="md-error" v-if="!$v.form.password.required">ពាក្យសម្ងាត់ តម្រូវឱ្យបំពេញ</span>
            </md-field>
        </div>
        <div class="md-layout-item md-size-20 btn-login-wrapper" style="padding:0;margin:0;">
            <md-button type="submit" class="md-raised md-primary modify-button" @click="login">ចូលប្រើប្រាស់</md-button>
        </div>
    </form>
    {{loginStatus}}
    <vue-snotify/>
</div>
</template>

<script>
import {
    validationMixin
} from 'vuelidate'
import {
    required,
    email,
    minLength,
    maxLength
} from 'vuelidate/lib/validators'
export default {
    mixins: [validationMixin],
    data: () => ({
        form: {
            username: null,
            password: null
        },
    }),
    validations: {
        form: {
            username: {
                required,
            },
            password: {
                required,
            },
        }
    },
    computed: {
        loginStatus() {
            return this.$store.getters.getLoginStatus;
        }
    },
    methods: {
        getValidationClass(fieldName) {
            const field = this.$v.form[fieldName]
            if (field) {
                return {
                    'md-invalid': field.$invalid && field.$dirty
                }
            }
        },
        validateUser() {
            this.$v.$touch();
        },
        snotify(title, content) {
            this.$snotify.error(content, title, {
                timeout: 2500,
                showProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true
            });
        },
        login() {
            if (!!this.form) {
                this.$store.commit("login", this.form)

                if (this.loginStatus == false) {
                    this.snotify("បរាជ័យ", "សូមត្រួតពិិនិត្យ ឈ្មោះអ្នកប្រើប្រាស់ និងពាក្យសម្ងាត់ម្តងទៀត");
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
    height: 100vh;
    width: 100%;
    background: linear-gradient(0deg, rgba(4, 23, 35, 0.8), rgba(4, 23, 35, 1)), url("../../assets/bg.jpg") no-repeat;
    background-size: cover;
    background-position: 50%;
    position: relative;
}

.logo {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.system-name {
    font-family: 'KhmerOSMuolpali', Arial, Helvetica, sans-serif;
    font-size: 25px;
    color: #fff;
    position: absolute;
    top: 33%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.title {
    font-family: 'KhPreyVeng', Arial, Helvetica, sans-serif;
    font-size: 25px;
    color: #fff;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.username-wrapper {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.password-wrapper {
    position: absolute;
    top: 63%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.btn-login-wrapper {
    position: absolute;
    top: 72%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.modify-button {
    width: 100%;
    padding: 0;
    margin: 0;
    border-radius: 50px;
    font-family: 'KhPreyVeng', Arial, Helvetica, sans-serif;
    font-size: 20px;
    height: 50px;
}

.md-input {
    font-family: 'KhmerOSBattambang', Arial, Helvetica, sans-serif !important;
    font-style: normal;
    margin-bottom: 3px;
    margin-top: 3px;
    -webkit-text-fill-color: #fff !important;
}

.md-list-item-text {
    font-family: 'KhmerOSBattambang', Arial, Helvetica, sans-serif !important;
    font-size: 15px !important;
}

.md-label,
.md-stepper-label {
    font-family: 'KhmerOSBattambang', Arial, Helvetica, sans-serif;
    color: rgba(255, 255, 255, .7) !important;
}

.md-error {
    font-family: 'KhmerOSBattambang', Arial, Helvetica, sans-serif;
}

.md-field.md-theme-default:after {
    background: #fff;
}

.md-field.md-theme-default:before {
    background: #fff;
}
</style>
