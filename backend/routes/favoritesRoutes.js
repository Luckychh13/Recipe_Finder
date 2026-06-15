const express=require('express');
const User=require('../models/user');
const asyncHandler=require('express-async-handler');
const {protect} =require('../middleware/authMiddleware');

const router=express.Router();

const getFavorites=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.user._id);
  if(user){
    res.status(200).json(user.favorites);
  }else{
    res.status(404);
    throw new Error('User not found');
  }
});

const addFavorite=asyncHandler(async(req,res)=>{
  const { recipeId } = req.body;

  if(!recipeId){
    res.status(400);
    throw new Error('Recipe Id is required');
  }

  const user = await User.findById(req.user._id);

  if(!user){
    res.status(404);
    throw new Error('User not found');
  }

  // check duplicate (inside recipeId array)
  const alreadyExists = user.favorites.some(
    (fav) => fav.recipeId.includes(String(recipeId))
  );

  if(alreadyExists){
    res.status(400);
    throw new Error('Recipe is already in favorites');
  }

  user.favorites.push({
    recipeId: [String(recipeId)],
    notes: '',
  });

  await user.save();

  res.status(201).json({
    message:'Recipe added to favorites successfully',
    favorites:user.favorites,
  });
});

const removeFavorites=asyncHandler(async(req,res)=>{
  const { recipeId } = req.params;

  const user = await User.findById(req.user._id);

  if(!user){
    res.status(400);
    throw new Error('User not found');
  }

  user.favorites = user.favorites.filter(
    (fav) => !fav.recipeId.includes(String(recipeId))
  );

  await user.save();

  res.status(200).json({
    message:'Recipe removed from favorites successfully',
    favorites:user.favorites,
  });
});
const updateFavoriteNotes = asyncHandler(async (req, res) => {
  const { recipeId } = req.params;
  const { notes } = req.body;

  if (notes === undefined) {
    res.status(400);
    throw new Error('Notes field is required');
  }

  const updatedUser = await User.findOneAndUpdate(
    {
      _id: req.user._id,
      favorites: {
        $elemMatch: {
          recipeId: { $in: [String(recipeId)] }
        }
      }
    },
    {
      $set: { 'favorites.$.notes': notes }
    },
    { new: true }
  );

  if (!updatedUser) {
    res.status(404);
    throw new Error('Favorite recipe not found');
  }

  res.status(200).json({
    message: 'Notes updated successfully',
    favorites: updatedUser.favorites,
  });
});

router.route('/')
  .get(protect,getFavorites)
  .post(protect,addFavorite);

router.route('/:recipeId')
  .delete(protect,removeFavorites)
  .put(protect,updateFavoriteNotes);

module.exports=router;  