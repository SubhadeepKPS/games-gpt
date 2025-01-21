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
    <div className="hover:scale-90">
      <div className="w-32 h-auto m-2 text-slate-50 text-xs rounded-md bg-gradient-to-b from-amber-400 to-gray-950 border-2 border-amber-400">
        <div className="">
          <div className="pt-1 pr-2 pb-1 pl-1 w-32 h-auto">
            <img src={thumbnail} className="rounded-md" />
          </div>
          <div className="px-2 pb-1">
            <div className="font-bold text-sm text-red-500 shadow-lg">
              {title.length >= 15 ? (
                <h3>{title.slice(0, 13) + "..."}</h3>
              ) : (
                <h3>{title}</h3>
              )}
            </div>
            <div className="text-xs">
              {publisher.length >= 20 ? (
                <h3>{publisher.slice(0, 17) + "..."}</h3>
              ) : (
                <h3>{publisher}</h3>
              )}
            </div>
            <h4 className="text-xs font-semibold py-0.5">{genre}</h4>
            {/* <h4>{platform}</h4> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilteredGameCard;
