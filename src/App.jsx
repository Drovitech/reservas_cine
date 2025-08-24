import { useEffect, useMemo, useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthLoginRegister() {
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null); 

  useEffect(() => {
    const saved = localStorage.getItem("savedEmail");
    if (saved) setEmail(saved);
  }, []);

  useEffect(() => {
    setPassword("");
    setConfirm("");
    setShowPwd(false);
    setToast(null);
  }, [mode]);

  const emailValid = useMemo(() => /\S+@\S+\.\S+/.test(email), [email]);
  const pwdValid = useMemo(() => /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password), [password]);
  const confirmValid = useMemo(() => (mode === "login" ? true : confirm === password && confirm.length > 0), [confirm, password, mode]);

  const formValid = emailValid && pwdValid && confirmValid;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) return;
    setSubmitting(true);

    await new Promise((r) => setTimeout(r, 900));

    if (mode === "login") {
      if (remember) localStorage.setItem("savedEmail", email);
      setToast({ type: "success", message: "Sesión iniciada (ficticio). Conecta tu API para hacerlo real." });
    } else {
      setToast({ type: "success", message: "Registro completado (ficticio). Ahora puedes iniciar sesión." });
      setMode("login");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="backdrop-blur-sm bg-white/80 border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-800">
                {mode === "login" ? "Inicia sesión" : "Crea tu cuenta"}
              </h1>
              <div className="text-sm text-slate-500">React + Tailwind</div>
            </div>

            <div className="mt-4 inline-flex bg-slate-100 rounded-xl p-1">
              <button
                className={`px-4 py-2 text-sm rounded-lg transition ${
                  mode === "login" ? "bg-white shadow font-medium" : "text-slate-600"
                }`}
                onClick={() => setMode("login")}
              >
                Login
              </button>
              <button
                className={`px-4 py-2 text-sm rounded-lg transition ${
                  mode === "register" ? "bg-white shadow font-medium" : "text-slate-600"
                }`}
                onClick={() => setMode("register")}
              >
                Registro
              </button>
            </div>
          </div>

          {/* Body */}
          <form onSubmit={onSubmit} noValidate className="p-6 space-y-4">
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Correo electrónico
              </label>
              <div className={`flex items-center gap-2 border rounded-xl px-3 py-2 bg-white ${
                email.length > 0 ? (emailValid ? "border-emerald-300" : "border-rose-300") : "border-slate-200"
              }`}>
                <Mail className="size-4 text-slate-500" />
                <input
                  id="email"
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  className="w-full outline-none placeholder:text-slate-400 text-slate-800"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
              {email.length > 0 && !emailValid && (
                <p className="text-xs text-rose-600">Ingresa un correo válido.</p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Contraseña
              </label>
              <div className={`flex items-center gap-2 border rounded-xl px-3 py-2 bg-white ${
                password.length > 0 ? (pwdValid ? "border-emerald-300" : "border-rose-300") : "border-slate-200"
              }`}>
                <Lock className="size-4 text-slate-500" />
                <input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres y un número"
                  className="w-full outline-none placeholder:text-slate-400 text-slate-800"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="p-1 rounded hover:bg-slate-100"
                  aria-label={showPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPwd ? <EyeOff className="size-4 text-slate-500" /> : <Eye className="size-4 text-slate-500" />}
                </button>
              </div>
              {password.length > 0 && !pwdValid && (
                <p className="text-xs text-rose-600">Debe tener 8+ caracteres e incluir al menos un número.</p>
              )}
            </div>

            {mode === "register" && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="space-y-1"
                >
                  <label htmlFor="confirm" className="block text-sm font-medium text-slate-700">
                    Confirmar contraseña
                  </label>
                  <div className={`flex items-center gap-2 border rounded-xl px-3 py-2 bg-white ${
                    confirm.length > 0 ? (confirmValid ? "border-emerald-300" : "border-rose-300") : "border-slate-200"
                  }`}>
                    <Lock className="size-4 text-slate-500" />
                    <input
                      id="confirm"
                      type="password"
                      placeholder="Repite tu contraseña"
                      className="w-full outline-none placeholder:text-slate-400 text-slate-800"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      autoComplete="new-password"
                      required={mode === "register"}
                    />
                  </div>
                  {confirm.length > 0 && !confirmValid && (
                    <p className="text-xs text-rose-600">Las contraseñas no coinciden.</p>
                  )}
                </motion.div>
              </AnimatePresence>
            )}

            {mode === "login" && (
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-sm text-slate-700 select-none">
                  <input
                    type="checkbox"
                    className="size-4 accent-slate-800"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  Recuérdame
                </label>
                <button type="button" className="text-sm text-slate-600 hover:underline">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={!formValid || submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-medium shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed bg-slate-900 text-white hover:bg-slate-800"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Procesando...
                </>
              ) : mode === "login" ? (
                "Entrar"
              ) : (
                "Registrarme"
              )}
            </button>

            <p className="text-center text-sm text-slate-600">
              {mode === "login" ? (
                <>
                  ¿No tienes cuenta?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("register")}
                    className="font-medium text-slate-900 hover:underline"
                  >
                    Regístrate
                  </button>
                </>
              ) : (
                <>
                  ¿Ya tienes cuenta?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="font-medium text-slate-900 hover:underline"
                  >
                    Inicia sesión
                  </button>
                </>
              )}
            </p>
          </form>

          {/* Toast */}
          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`mx-6 mb-6 rounded-xl border ${
                  toast.type === "success"
                    ? "bg-emerald-50 border-emerald-200"
                    : "bg-amber-50 border-amber-200"
                } p-3 flex items-start gap-2`}
              >
                {toast.type === "success" ? (
                  <CheckCircle2 className="size-5 text-emerald-600 mt-0.5" />
                ) : (
                  <AlertTriangle className="size-5 text-amber-600 mt-0.5" />
                )}
                <p className="text-sm text-slate-800">{toast.message}</p>
                <button className="ml-auto text-slate-500 hover:text-slate-700" onClick={() => setToast(null)}>
                  ×
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-slate-500 mt-4">
          &copy;Sistema de reservas de cine. Todos Los Derechos Reservados.
        </p>
      </motion.div>
    </div>
  );
}
