const FilteredGameCard = (game) => {
  // console.log("game: ", game.info);
  const {
    developer,
    freetogame_profile_url,
    game_url,
    genre,
    id,
    platform,
    publisher,
    release_date,
    short_description,
    thumbnail,
    title,
  } = game.info;

  return !game ? (
    <div>
      <div>Loading...</div>
    </div>
  ) : (
    <div className="">
      <div className="w-32 h-auto m-2 text-slate-50 text-xs bg-gradient-to-b from-amber-400 to-gray-950 border-2 border-amber-400">
        <div className="">
          <div className="pt-1 pr-2 pl-1 w-32 h-auto">
            <img src={thumbnail} className="" />
          </div>
          <div className="px-1 pb-1">
            <div>
              {title.length >= 25 ? (
                <h3>{title.slice(0, 25) + "..."}</h3>
              ) : (
                <h3>{title}</h3>
              )}
            </div>
            <div>
              {publisher.length >= 25 ? (
                <h3>{publisher.slice(0, 25) + "..."}</h3>
              ) : (
                <h3>{publisher}</h3>
              )}
            </div>
            <h4>{genre}</h4>
            {/* <h4>{platform}</h4> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilteredGameCard;
