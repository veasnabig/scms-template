<template>
<div>
    <md-dialog :md-active.sync="showAddCoursesDialog" :md-click-outside-to-close='false' :md-close-on-esc='false'>

        <md-dialog-title class="dialog-title-wrapper">
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-50">
                    <div class="icon-wrapper">
                        <i class="icon" :class="cardItem.icon"></i>
                    </div>
                    <span class="dialog-title">{{cardItem.name}}</span>
                </div>
                <div class="md-layout-item md-size-50">
                    <div class="md-toolbar-section-end">
                        <md-button class="md-icon-button" @click="closeDialog">
                            <span>X</span>
                        </md-button>
                    </div>
                </div>
            </div>
        </md-dialog-title>

        <form novalidate class="md-layout" @submit.prevent="validateForm">

            <!-- <md-card-content> -->
            <div class="md-layout md-gutter" style="padding:20px;">
                <div class="md-layout-item md-size-33 md-small-size-100">
                    <md-field :class="getValidationClass('name')">
                        <label class="md-label">ឈ្មោះវគ្គ</label>
                        <md-input v-model="form.name" />
                        <span class="md-error md-label" v-if="!$v.form.name.required">ឈ្មោះវគ្គត្រូវបំពេញ</span>
                        <!-- <span class="md-error" v-else-if="!$v.form.name.minlength">ឈ្មោះវគ្គ មិនត្រឹមត្រូវ</span> -->
                    </md-field>
                </div>
                <div class="md-layout-item md-size-33 md-small-size-100">
                    <md-field :class="getValidationClass('price')">
                        <label class="md-label">តម្លៃ</label>
                        <md-input type="number" v-model="form.price" />
                        <span class="md-error md-label" v-if="!$v.form.name.required">តម្លៃត្រូវបំពេញ</span>
                        <!-- <span class="md-error" v-else-if="!$v.form.name.minlength">Invalid price</span> -->
                    </md-field>
                </div>

                <div class="md-layout-item md-size-33 md-small-size-100">
                    <md-field :class="getValidationClass('duration')">
                        <label class="md-label">រយៈពេលសិក្សា</label>
                        <md-input v-model="form.duration" />
                        <span class="md-error md-label" v-if="!$v.form.duration.required">រយៈពេលសិក្សាត្រូវបំពេញ</span>
                        <!-- <span class="md-error" v-else-if="!$v.form.duration.minlength">Invalid duration</span> -->
                    </md-field>
                </div>

                <div class="md-layout-item md-size-100 md-small-size-100">
                    <md-field>
                        <label class="md-label">បរិយាយ</label>
                        <md-textarea class="md-input"></md-textarea>
                    </md-field>
                </div>

                <div class="md-layout-item md-size-100 md-small-size-100">
                    <div class="md-toolbar-section-end">
                        <md-button class="md-raised md-primary" @click="validateForm">Add New</md-button>
                    </div>
                </div>

            </div>

            <md-progress-bar md-mode="indeterminate" v-if="sending" />
            <!-- <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar> -->
        </form>
        <vue-snotify/>
    </md-dialog>

</div>
</template>

<script>
import {
    colors
} from "@/styles/colors.js";
import ScmsCard from "@/components/SCMSCard";
import {
    validationMixin
} from "vuelidate";
import {
    required,
    email,
    minLength,
    maxLength
} from "vuelidate/lib/validators";
export default {
    components: {
        ScmsCard
    },
    props: ["showAddCoursesDialog", "cardItem"],
    mixins: [validationMixin],
    data: () => ({
        form: {
            id: "",
            name: "",
            price: "",
            duration: "",
            description: ""
        },
        userSaved: false,
        sending: false,
        lastUser: null
    }),
    computed: {
        maxId() {
            return this.$store.getters.getCoursesMaxId + 1;
        }
    },
    validations: {
        form: {
            name: {
                required
            },
            price: {
                required
            },
            duration: {
                required
            }
        }
    },
    methods: {
        getValidationClass(fieldName) {
            const field = this.$v.form[fieldName];

            if (field) {
                return {
                    "md-invalid": field.$invalid && field.$dirty
                };
            }
        },
        clearForm() {
            this.$v.$reset();
            this.form = {
                id: "",
                name: "",
                price: "",
                duration: "",
                description: ""
            }
        },
        snotify() {
            this.$snotify.success('Example body content', 'Example title', {
                timeout: 500,
                showProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true
            });
        },
        addCourses() {
            this.sending = true
            this.form.id = this.maxId;
            this.$store.commit("addCourses", this.form);
            this.clearForm();
            this.snotify();
        },
        validateForm() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                this.addCourses();
            }
        },
        closeDialog() {
            this.$emit("closeDialog", !this.showAddCoursesDialog);
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../icons/icon.css";
.md-dialog {
    border-radius: 12px;
    width: 100vh;
}

.text1 {
    font-family: 'khPreyVeng';
}

.text2 {
    font-family: 'KhBaphnom';
}

.text3 {
    font-family: 'KhmerOS_muolpali';
}

.md-label {
    font-family: 'KhmerOSBattambang'; // margin-bottom: 5px;
}

.md-input {
    font-family: 'KhmerOSBattambang';
    margin-bottom: 3px;
    margin-top: 3px;
}

.dialog-title-wrapper {
    height: 100px;
    -webkit-box-shadow: 0px 13px 35px -24px rgba(204, 204, 204, 1);
    -moz-box-shadow: 0px 13px 35px -24px rgba(204, 204, 204, 1);
    box-shadow: 0px 13px 35px -24px rgba(204, 204, 204, 1); // margin-top: -20px;
    .icon-wrapper {
        width: 80px;
        height: 80px;
        position: absolute;
        top: 10px;
        .icon {
            font-size: 80px !important;
        }
    }
    .dialog-title {
        margin-left: 100px;
        line-height: 50px;
        font-family: 'khPreyVeng'; // background: -webkit-linear-gradient(#eee, #333);
        // -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
    }
}
</style>
