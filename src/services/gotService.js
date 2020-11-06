export default class GotService {
  static baseURL = 'https://www.anapioficeandfire.com/api/';

  async getResource = (url) => {
      const res = await fetch(`${this.baseURL}${url}`);
      if (!res.ok){
        throw new Error(`Could not fetch ${url}, status: ${res.status}`)
      }
      return await res.json();
  }

  getAllCharacters = () =>{
    return this.GetResouce(`characters?page=5&pageSize=10`);
  }

  getCharacter = (id) =>{
    return this.GetResouce(`characters/${id}`);
  }

}