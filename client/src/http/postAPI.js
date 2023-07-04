import { $authHost, $host } from "./index";

export const createTheme = async (theme) => {
  const { data } = await $authHost.post('api/theme', theme)
  return data
}
export const fetchThemes = async () => {
  const { data } = await $host.get('api/theme')
  return data
}
export const createPost = async (post) => {
    const { data } = await $authHost.post('api/post', post)
    return data
  }
export const fetchPosts = async (theme_id) => {
    const { data } = await $host.get('api/post', {params: {theme_id}})
    return data
  }
export const fetchOnePost = async (id) => {
    const { data } = await $host.get('api/post/' + id)
    return data
  }
export const updateTheme = async (id, theme) => {
    const {data} = await $authHost.put('api/theme/' + id, theme)
  } 

export const updatePost = async (id, Column, post) => {
    const { data } = await $authHost.put('api/post/' + id + '/' + Column, post)
    return data
  }
export const deletePost = async (id) => {
    const { data } = await $authHost.delete('api/post/' + id)
    return data
  }