export const shortenTeamName = teamName => {
  let shortName = teamName
    ?.split(' ')
    .reduce(
      (acc, el, i, arr) =>
        arr.length > 1 ? acc + el.charAt(0) : el.substring(0, 3),
      '',
    )
    .toUpperCase();
  return shortName;
};
