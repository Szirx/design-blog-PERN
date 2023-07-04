import { makeAutoObservable } from "mobx";

export default class SortBlog {
    constructor() {
        this._sorts = [
            {id: 1, label: "Сначала старые"},
            {id: 2, label: "Сначала новые"}
        ]
        this._selectedSort = {}
        makeAutoObservable(this)
    }
    setSelectSort(sort) { this._selectedSort = sort }

    get sorts() { return this._sorts }
    get selectedSort() { return this._selectedSort }
}