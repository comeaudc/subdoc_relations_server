export const logReq = (req, res, next) => {
  console.log(
    `${req.method} -- ${req.url} -- ${new Date().toLocaleTimeString()}`,
  );

  if (req.body) {
    console.table(req.body);
  }

  next();
}

export const globalErr = (err, req, res, next) => {
  res.status(err.status || 500).json({ error: `❌ Error: ${err.message}` });
}

