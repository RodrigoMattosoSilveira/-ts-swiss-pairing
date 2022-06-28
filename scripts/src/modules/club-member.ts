import fs = require("fs");

export type IClubMember = {
  id: string; // 8 chars, random string
  first: string;
  last: string;
  email: string;
  password: string;
  cell: string
  rating: number;
  status: boolean;
}
// Save club members
export const saveClubMembers = (clubMember: IClubMember[]): void => {
  try {
    const fd = fs.openSync(`/Users/rodrigosilveira/projects/ts-swiss-pairing/scripts/data/raw/club-members.json`, 'w', 0o666)
    fs.writeSync(fd, JSON.stringify(clubMember));
    fs.closeSync(fd);
  }
  catch (err) {
    console.log(err);
  }
}
