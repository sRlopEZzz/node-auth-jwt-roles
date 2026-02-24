// ypass dev sem banco de dados (teste =
if(config.DEV_BYPASS_AUTH === "true") {
    // regra simples para simular roles
    const tipo_usuario = email.toLowerCase().includes("admin") ? "admin" : "cliente";
    const token = generateAuthToken({ email, tipo_usuario });

    return res.status(200).json({
      message: "Login DEV (bypass) efetuado.",
      token,
      email,
      tipo_usuario,
    });
  }