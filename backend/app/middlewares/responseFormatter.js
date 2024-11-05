export const allDataResponseFormatter = (req, res) => {
  const { data, totalRecords, limit, offset } = req;
  setTimeout(() => {
    res.status(200).json({
      status: "success",
      statusCode: 200,
      totalRecords: totalRecords || 0,
      limit: limit || 10,
      offset: offset || 0,
      data: data || [],
    });
  }, 500);
};
