import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

function FavouriteIcon(props) {
  const isFavourited = localStorage.getItem(props.id);
  const handleToggleFavourite = () => {
    if (!isFavourited) {
        localStorage.setItem(props.id, props.data);
      } else {
        localStorage.removeItem(props.id);
      }
      window.dispatchEvent(new Event("storage"));
    }
      return (
        <IconButton className="iconButton"
          onClick={handleToggleFavourite}>
          {isFavourited ? (
            <FavoriteIcon className="favoriteIcon"></FavoriteIcon>
          ) : (
            <FavoriteBorderOutlinedIcon className="favoriteIcon"></FavoriteBorderOutlinedIcon>
          )}
        </IconButton>
      )
}

export default FavouriteIcon;
