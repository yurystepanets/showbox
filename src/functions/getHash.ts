export default function getHash(key: string) {
  let p = window.location.hash.match(new RegExp(key + '=([^&=]+)'))
  return p ? p[1] : false;
}
