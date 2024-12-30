import "./assets/font/main.css";
import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
// import Template from "./Template";
//import { useStyles } from "tss-react";
import { tss } from "tss-react/mui";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import backgroundJpgUrl from "./assets/img/background.jpg";
import UserProfileFormFields from "./UserProfileFormFields";

const Login = lazy(()=> import("./pages/Login") );

const Template =lazy(()=>import("./Template"));
const DefaultTemplate =lazy(()=>import("keycloakify/login/Template"));

const Register = lazy(() => import("./pages/Register"));
const doMakeUserConfirmPassword = true;

const theme= createTheme({
    palette:{
     mode: "dark",
     background:{
        default:"#000000",
        paper:"#111111"
    },
    text:{
        primary:"#EDEDED",
        secondary:"#A1A1A1"
    },
},
    typography:{
        fontFamily:"Geist"
    }

});

export default function KcPage(props: { kcContext: KcContext }) {
    return(
        <ThemeProvider theme={theme}>
            <KcPageContextualized {...props} />
        </ThemeProvider>
    );

}

function KcPageContextualized(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    const { classes } = useStyles();

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "login.ftl":
                        return (
                            <Login
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "register.ftl":
                        return (
                            <Register
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={{}}
                                Template={DefaultTemplate}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}

const useStyles = tss.create(({ theme })=>({
     kcHtmlClass:{
":root":{
    colorsScheme:"dark",
    backdropFilter: "blur(100px)",
}
     },
     kcBodyClass:{
        color: theme.palette.text.primary,
        background: `url(${backgroundJpgUrl}) no-repeat center center fixed`,
        backgroundSize: "cover",
        
     },
    //  kcFormClass: {
    //     background: "rgba(0, 0, 0, 0.5)", // Nền màu đen mờ
    //     backdropFilter: "blur(10px)",    // Hiệu ứng mờ
    //     borderRadius: "8px",            // Tùy chọn: thêm góc bo tròn
    //     padding: "20px",                // Tùy chọn: thêm khoảng cách bên trong
    //     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Tùy chọn: thêm đổ bóng
    // },
} satisfies{[key in ClassKey]?: unknown} ));

// const classes = {
//     kcHtmlClass:"",
//     kcBodyClass:""

// } satisfies { [key in ClassKey]?: string };
