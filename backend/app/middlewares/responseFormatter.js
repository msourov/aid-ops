export const allDataResponseFormatter = (req, res) => {
  const { data, totalRecords } = req;
  setTimeout(() => {
    res.status(200).json({
      status: "success",
      statusCode: 200,
      totalRecords: totalRecords || 0,
      data: data || [],
    });
  }, 500);
};
