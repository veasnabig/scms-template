<template>
<div>
    <md-dialog :md-active.sync="showSubjectDialog" :md-click-outside-to-close='false' :md-close-on-esc='false' @keydown.esc="closeDialog">
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
                            <i class="icon-corss" style="font-size:20px;"></i>
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
                        <label class="md-label">ឈ្មោះមុខវិជ្ជា</label>
                        <md-input v-model="form.name" />
                        <span class="md-error md-label" v-if="!$v.form.name.required">ឈ្មោះមុខត្រូវបំពេញ</span>
                    </md-field>
                </div>
                <div class="md-layout-item md-size-33 md-small-size-100">
                    <md-field :class="getValidationClass('price')">
                        <label class="md-label">តម្លៃ</label>
                        <md-input type="number" v-model="form.price" />
                        <span class="md-error md-label" v-if="!$v.form.name.required">តម្លៃត្រូវបំពេញ</span>
                    </md-field>
                </div>

                <div class="md-layout-item md-size-33 md-small-size-100">
                    <md-field :class="getValidationClass('duration')">
                        <label class="md-label">រយៈពេលសិក្សា</label>
                        <md-input v-model="form.duration" />
                        <span class="md-error md-label" v-if="!$v.form.duration.required">រយៈពេលសិក្សាត្រូវបំពេញ</span>
                    </md-field>
                </div>

                <div class="md-layout-item md-size-100 md-small-size-100">
                    <md-field>
                        <label class="md-label">បរិយាយ</label>
                        <md-textarea class="md-input" v-model="form.description"></md-textarea>
                    </md-field>
                </div>

                <!-- action button -->
                <div class="md-layout-item md-size-100 md-small-size-100" style="padding:20px">
                    <div class="md-toolbar-section-end">
                        <icon-button :iconButton="iconButton.buttonReset" :onClick="clearForm" />
                        <icon-button :iconButton="iconButton.buttonSave" :onClick="validateForm" />
                    </div>
                </div>
            </div>

        </form>
        <vue-snotify v-show="showNotify==true" />
    </md-dialog>

</div>
</template>

<script>
import {
    colors
} from "@/styles/colors.js";
import increaseId from "@/lib/increaseId.js";
import ScmsCard from "@/components/SCMSCard";
import IconButton from "@/components/IconButton";
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
        ScmsCard,
        IconButton
    },
    props: {
        showSubjectDialog: Boolean,
        cardItem: Object,
        subjectItem: {}
    },
    mixins: [validationMixin],
    data: () => ({
        showNotify: false,
        iconButton: {
            buttonSave: {
                text: "រក្សាទុក",
                icon: "icon-save",
                iconBg: {
                    background: `linear-gradient(${colors.lightBlue}, ${colors.blue})`
                }
            },
            buttonReset: {
                text: "កំណត់ឡើងវិញ",
                icon: "icon-reset",
                iconBg: {
                    background: `linear-gradient(${colors.lightTeal}, ${colors.teal})`
                }
            }
        },
        subjectId: "",
        form: {
            id: "",
            name: "",
            price: "",
            duration: "",
            description: ""
        },
        userSaved: false,
        lastUser: null
    }),
    computed: {
        getIncreaseSubjectId() {
            const id = this.$store.getters.getIncreaseSubjectId;
            return increaseId(id);
        }
    },
    watch: {
        subjectItem(props) {
            if (!!props) {
                this.getPropSubject(props);
            }
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
        getPropSubject(props) {
            this.subjectId = props.id;
            this.form = {
                id: props.id,
                name: props.name,
                price: props.price,
                duration: props.duration,
                description: props.description
            };
        },
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
            if (!!this.subjectId) {
                this.getPropSubject(this.subjectItem);
            } else {
                this.form = {
                    id: "",
                    name: "",
                    price: "",
                    duration: "",
                    description: ""
                };
            }
        },
        snotify(title, content) {
            this.$snotify.success(content, title, {
                timeout: 800,
                showProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true
            });
        },
        addSubject() {
            this.showNotify = true;
            if (!!this.subjectId) {
                this.$store.commit("updateSubject", this.form);
                this.clearForm();
                if (!!this.showNotify) {
                    this.snotify("ជោគជ័យ", "ទិន្ន័យកែប្រែបានជោគជ័យ");
                }
                window.setTimeout(() => {
                    this.showNotify = false;
                    this.closeDialog();
                }, 1500);
            } else {
                this.form.id = this.getIncreaseSubjectId;
                this.$store.commit("addSubject", this.form);
                this.clearForm();
                if (!!this.showNotify) {
                    this.snotify("ជោគជ័យ", "បញ្ជូលទិន្ន័យបានជោគជ័យ");
                }
                window.setTimeout(() => {
                    this.showNotify = false;
                }, 1500);
            }
        },
        validateForm() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                this.addSubject();
            }
        },
        closeDialog() {
            this.$emit("closeDialog", !this.showSubjectDialog);
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../icons/icon.css";
@import "../../styles/scss/index";
.md-dialog {
    border-radius: 12px;
    width: 100vh;
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
        font-family: "khPreyVeng"; // background: -webkit-linear-gradient(#eee, #333);
        // -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
    }
}
</style>
