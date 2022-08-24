const Shoe = require('../Models/shoe.model');

exports.createShoe = async (req, res) => {
  const {brand, size, price, color, quantity,} = req.body
  const userId = req.params.id
  try{
  const shoe = await Shoe.create({
    brand,
    price,
    color,
    quantity,
    owner: userId
  })
  return await res.status(201).json(shoe);
} catch (error) {
  return res.status(500).json(error.message);
}
};

exports.findOneShoe = async (req, res) => {
  const id = req.params.id;

  try{
    const shoe = await Shoe.findById(id);
    return await res.status(200).json(shoe);
  } catch (err) {
    return res.status(500).json(err)
  }
}

exports.findUser = async (req, res) => {
  const {id} = req.params
  try{
    const shoe = await Shoe.findById(id).populate('owner')
    return await res.status(200).json(shoe)
  } catch(err) {
    return res.status(500).json(err)
  }
}

exports.findAllShoe = async (req, res) => {
  
  try {
  const shoes = await Shoe.find();
  return await res.status(200).json(shoes)
} catch (err) {
  return res.status(500).json(err);
}
}

exports.updateShoe = async (req, res) => {
  const id = req.params.id;

  // if(!req.body) {
  //   return res.status(400).send('data to update cannot be empty')
  // }
  try {
    const shoes = await Shoe.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    return await res.status(201).json(shoes)
  } catch (error) {
    return res.status(500).json(error)
  }
}

exports.deleteShoe = async (req, res) => {
  const id = req.params.id;

  try{
    const shoe = await Shoe.findByIdAndDelete(id);
    return await res.status(200).json(`${shoe} has been successfully deleted`)
  } catch (error) {
    return res.status(500).json(error)
  }
}

exports.deleteAllShoe = async (req, res) => {
  try {
    const shoes = await Shoe.deleteMany({});
    return await res.status(200).json(`Successfully deleted the collection for ${shoes}`)
  } catch (error) {
    return res.status(500).json(error)
  }
}