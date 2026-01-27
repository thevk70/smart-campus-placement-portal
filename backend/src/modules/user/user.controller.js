export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user
  });
};

export const updateMe = async (req, res) => {
  const updates = req.body;

  const updatedUser = await req.user.updateOne(
    { $set: updates },
    { new: true }
  );

  res.status(200).json({
    success: true,
    data: { ...req.user._doc, ...updates }
  });
};
