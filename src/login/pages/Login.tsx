import { useState} from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import Link from "@mui/material/Link";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import  Typography  from "@mui/material/Typography";








export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const [showPassword, setShowPassword] = useState(false);

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("loginAccountTitle")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div>
                    <div>
                        <Typography variant="body1" >
                            {msg("noAccount")}{" "}
                            <Link tabIndex={8} href={url.registrationUrl}>
                                {msg("doRegister")}
                            </Link>
                        </Typography>
                    </div>
                </div>
            }
            socialProvidersNode={
                <>
                    {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                        <div id="kc-social-providers" className={kcClsx("kcFormSocialAccountSectionClass")}>
                            <hr />
                            <h2>{msg("identity-provider-login-label")}</h2>
                            <ul className={kcClsx("kcFormSocialAccountListClass", social.providers.length > 3 && "kcFormSocialAccountListGridClass")}>
                                {social.providers.map((...[p, , providers]) => (
                                    <li key={p.alias}>
                                        <a
                                            id={`social-${p.alias}`}
                                            className={kcClsx(
                                                "kcFormSocialAccountListButtonClass",
                                                providers.length > 3 && "kcFormSocialAccountGridItem"
                                            )}
                                            type="button"
                                            href={p.loginUrl}
                                        >
                                            {p.iconClasses && <i className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses)} aria-hidden="true"></i>}
                                            <span
                                                className={clsx(kcClsx("kcFormSocialAccountNameClass"), p.iconClasses && "kc-social-icon-text")}
                                                dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }}
                                            ></span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            }
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    {realm.password && (
                        <form
                            id="kc-form-login"
                            onSubmit={() => {
                                setIsLoginButtonDisabled(true);
                                return true;
                            }}
                            action={url.loginAction}
                            method="post"
                        >
                            {!usernameHidden && (
                                <div className={kcClsx("kcFormGroupClass")}>
                                    {/*}
                                    <label htmlFor="username" className={kcClsx("kcLabelClass")}>
                                        {!realm.loginWithEmailAllowed
                                            ? msg("username")
                                            : !realm.registrationEmailAsUsername
                                              ? msg("usernameOrEmail")
                                              : msg("email")}
                                    </label>
                                    <input
                                        tabIndex={2}
                                        id="username"
                                        className={kcClsx("kcInputClass")}
                                        name="username"
                                        defaultValue={login.username ?? ""}
                                        type="text"
                                        autoFocus
                                        autoComplete="username"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                    />

                                    {messagesPerField.existsError("username", "password") && (
                                        <span
                                            id="input-error"
                                            className={kcClsx("kcInputErrorMessageClass")}
                                            aria-live="polite"
                                            dangerouslySetInnerHTML={{
                                                __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                            }}
                                        />
                                    )}
                                */}
                                    <TextField 
                                        sx={{
                                            width: "100%",
                                            minWidth: 300,
                                            pb: 2,
                                            '& .MuiInputLabel-root': {      
                                                fontSize: '1.02rem',
                                                fontWeight: 600,
                                                color: '#FFFFFF',
                                                mixBlendMode: 'difference' // Chữ sẽ ngược màu với nền
                                            },
                                            '& .MuiOutlinedInput-input': {  
                                                fontSize: '1.3rem',
                                                fontWeight: 500,
                                                color: '#FFFFFF',
                                                mixBlendMode: 'difference' // Chữ sẽ ngược màu với nền
                                            }
                                            
                                        }}
                                        label={
                                            !realm.loginWithEmailAllowed
                                            ? msg("username")
                                            : !realm.registrationEmailAsUsername
                                              ? msg("usernameOrEmail")
                                              : msg("email")

                                        }
                                        tabIndex={2}
                                        variant="outlined" 
                                        name="username"
                                        defaultValue={login.username ?? ""}
                                        autoFocus
                                        autoComplete="username"
                                        error={messagesPerField.existsError("username", "password")}
                                        helperText={
                                            messagesPerField.existsError("username", "password") && (
                                                <span
                                                    
                                                    aria-live="polite"
                                                    dangerouslySetInnerHTML={{
                                                        __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                                    }}
                                                />
                                            )}

                                    />
                                  
                                </div>
                            )}

                            <div className={kcClsx("kcFormGroupClass")}>
                               {/* <label htmlFor="password" className={kcClsx("kcLabelClass")}>
                                    {msg("password")}
                                </label>
                                
                                <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password">
                                    <input
                                        tabIndex={3}
                                        id="password"
                                        className={kcClsx("kcInputClass")}
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                    />
                                </PasswordWrapper>
                                {usernameHidden && messagesPerField.existsError("username", "password") && (
                                    <span
                                        id="input-error"
                                        className={kcClsx("kcInputErrorMessageClass")}
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                        }}
                                    />
                                )}
                        */}
                            <FormControl sx={{ 
                                 width:"100%",
                                 minWidth:300,
                                 pb:3,
                                 '& .MuiInputLabel-root': {      
                                    fontSize: '1.02rem',
                                    fontWeight: 600,
                                    color: '#FFFFFF',
                                    mixBlendMode: 'difference' // Chữ sẽ ngược màu với nền
                                },
                                '& .MuiOutlinedInput-input': {  
                                    fontSize: '1.3rem',
                                    fontWeight: 500,
                                    color: '#FFFFFF',
                                    mixBlendMode: 'difference' // Chữ sẽ ngược màu với nền
                                }
                                
                             }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">{msg("password")}</InputLabel>
                                <OutlinedInput
                                    tabIndex={3}
                                    name="password"
                                    autoComplete="current-password"
                                    error={messagesPerField.existsError("username","password")}

                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={()=>setShowPassword(!showPassword)}
                                        onMouseDown={e=>e.preventDefault()}
                                        edge="end"
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label="Password"
                                />
                                 {usernameHidden && messagesPerField.existsError("username", "password") && (
                                    
                            <FormHelperText>
                                    <span
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html:(messagesPerField.getFirstError("username", "password"))
                                        }}
                                    />
                                        
                                    </FormHelperText>
                                )}
                               

                            </FormControl>
                                     
                            </div>

                            <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                                <div id="kc-form-options">
                                    {realm.rememberMe && !usernameHidden && (
                                      /*
                                      <div className="checkbox">
                                            <label>
                                                <input
                                                    tabIndex={5}
                                                    id="rememberMe"
                                                    name="rememberMe"
                                                    type="checkbox"
                                                    defaultChecked={!!login.rememberMe}
                                                />{" "}
                                                {msg("rememberMe")}
                                            </label>
                                        </div>
                                    */
                                    <FormControlLabel 
                                    control={
                                    <Checkbox 
                                        defaultChecked={!!login.rememberMe}
                                        tabIndex={5}
                                        name="rememberMe"
                                        />
                                } 
                                label={msg("rememberMe")}
                                    />
                                )}

                            </div>
                                <div className={kcClsx("kcFormOptionsWrapperClass")}>
                                    {realm.resetPasswordAllowed && (
                                        <span>
                                            <Link 
                                                sx={{
                                                    display:"inline-block",
                                                    position: "relative",
                                                    top: 14
                                                }}
                                                tabIndex={6} 
                                                href={url.loginResetCredentialsUrl}>
                                                {msg("doForgotPassword")}
                                            </Link>
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                                <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                                <Button 
                                sx={{width:"100%"}}
                                    tabIndex={7}
                                    variant="contained"
                                    type="submit"
                                    disabled={isLoginButtonDisabled}
                                    name="login"
                                >
                                    {msg("doLogIn")}
                                </Button>
                                
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </Template>
    );
}

// function PasswordWrapper(props: { kcClsx: KcClsx; i18n: I18n; passwordInputId: string; children: JSX.Element }) {
//     const { kcClsx, i18n, passwordInputId, children } = props;

//     const { msgStr } = i18n;

//     const [isPasswordRevealed, toggleIsPasswordRevealed] = useReducer((isPasswordRevealed: boolean) => !isPasswordRevealed, false);

//     useEffect(() => {
//         const passwordInputElement = document.getElementById(passwordInputId);

//         assert(passwordInputElement instanceof HTMLInputElement);

//         passwordInputElement.type = isPasswordRevealed ? "text" : "password";
//     }, [isPasswordRevealed]);

//     return (
//         <div className={kcClsx("kcInputGroup")}>
//             {children}
//             <button
//                 type="button"
//                 className={kcClsx("kcFormPasswordVisibilityButtonClass")}
//                 aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
//                 aria-controls={passwordInputId}
//                 onClick={toggleIsPasswordRevealed}
//             >
//                 <i className={kcClsx(isPasswordRevealed ? "kcFormPasswordVisibilityIconHide" : "kcFormPasswordVisibilityIconShow")} aria-hidden />
//             </button>
//         </div>
//     );
// }
