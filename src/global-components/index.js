
import LoadingIcon from "./loading-icon/Main.vue";
import SectionLoading from './section-loading/Main.vue';


export default (app) => {
    app.component("LoadingIcon", LoadingIcon);
    app.component("SectionLoading", SectionLoading);
};
