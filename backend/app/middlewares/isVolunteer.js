export const isVolunteer = (req, res, next) => {
  const { role } = req.user;
  if (role !== "volunteer") {
    return res.status(403).json({
      message: "Access denied, only volunteer can perform this operation",
    });
  }

  next();
};
