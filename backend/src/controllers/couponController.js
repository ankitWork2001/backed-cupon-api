import Coupon from "../models/Coupon.js";

const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().populate("brand");
    res.status(200).json(coupons);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

const addCoupon = async (req, res) => {
  const { couponCode, brand, discountPercentage, expiryDate, terms, isActive } =
    req.body;
  if (
    !couponCode ||
    !brand ||
    !discountPercentage ||
    !expiryDate ||
    !terms ||
    !isActive
  ) {
    return res.status(400).json({ error: "Please provide all the fields" });
  }
  try {
    const coupon = await Coupon.create({
      couponCode,
      brand,
      discountPercentage,
      expiryDate,
      terms,
      isActive,
    });
    res.status(201).json(coupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

const updateCoupon = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Please provide coupon id" });
  }
  try {
    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }
    const {
      couponCode,
      brand,
      discountPercentage,
      expiryDate,
      terms,
      isActive,
    } = req.body;
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      id,
      {
        couponCode: couponCode || coupon.couponCode,
        brand: brand || coupon.brand,
        discountPercentage: discountPercentage || coupon.discountPercentage,
        expiryDate: expiryDate || coupon.expiryDate,
        terms: terms || coupon.terms,
        isActive: isActive || coupon.isActive,
      },
      { new: true }
    );
    res.status(200).json(updatedCoupon);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
};

const deleteCoupon = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Please provide coupon id" });
  }
  try {
    await Coupon.findByIdAndDelete(id);
    res.status(200).json({ message: "Coupon deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export { getCoupons, addCoupon, updateCoupon , deleteCoupon};
