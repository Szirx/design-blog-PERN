import { makeAutoObservable } from 'mobx'

export default class PostBLog {
  constructor(props) {
    this._themes = []
    this._posts = []
    this._selectedTheme = {}
    this._selectedPost = {}
    makeAutoObservable(this)
  }

  setThemes(themes) {
    this._themes = themes
  }
  setPosts(posts) {
    this._posts = posts
  }
  setSelectedTheme(theme) {
    this._selectedTheme = theme
  }
  setSelectedPost(post) {
    this._selectedPost = post
  }
  get themes () {
    return this._themes
  }
  get posts() {
    return this._posts
  }
  get selectedPost() {
    return this._selectedPost
  }
  get selectedTheme() {
    return this._selectedTheme
  }
}