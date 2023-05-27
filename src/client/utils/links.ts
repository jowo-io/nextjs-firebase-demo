export function getLink(
  pathname: keyof typeof PathNames,
  map: { [key: string]: string }
): string {
  return Object.entries(map).reduce((acc, [key, val]) => {
    const frag = `[${key}]`;
    return acc.replace(frag, val);
  }, PathNames[pathname] as string);
}

export enum PathNames {
  // misc
  home = "/",
  auth = "/auth",

  // account
  account = "/account",

  // posts
  listEpisodes = "/episodes",
  viewEpisode = "/episodes/[id]",
}
