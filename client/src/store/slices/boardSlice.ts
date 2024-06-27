import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {IBoardState, ICard, IDraggableProps, IEditFormValues} from "../../types/types";
import {IArchiveList} from "./archiveSlice";
import {RootState} from "../index";
import {UploadFile} from "antd";
import {v4} from "uuid";

interface IAddListActionPayload {
    id: string;
    title: string;
}

interface IAddCardActionPayload {
    cardItem: ICard;
    listTitle: string;
}

interface IMoveCardActionPayload {
    source: IDraggableProps;
    destination: IDraggableProps;
    cardCopy: ICard;
}

interface IEditCardActionPayload {
    id: string;
    listTitle: string;
    values: IEditFormValues;
}

interface IRemoveFromBoardCardActionPayload {
    id: string;
    listTitle: string;
}

interface IRestoreCardActionPayload {
    index: number;
    cardItem: ICard;
    listId: string;
    listTitle: string;
}

interface IAddImageActionPayload {
    id: string;
    listTitle: string;
    file: UploadFile;
}

interface IRemoveImageActionPayload {
    id: string;
    listTitle: string;
    imageId: string;
}

interface ISetCoverImageActionPayload {
    id: string;
    listTitle: string;
    image: UploadFile | undefined;
}

const initialState: IBoardState[] = [
    {
        current: false,
        id: '123-123-123',
        title: 'Project Management',
        lists: {
            'id-todo-1': {
                listId: 'id-todo-1',
                title: 'Todo',
                tasks: [
                    {
                        id: 'id-123-edit-email-drafts',
                        title: 'Edit email drafts',
                        isSearchMatch: true
                    },
                    {
                        id: 'id-124-curate-customer-list',
                        title: 'Curate customer list',
                        isSearchMatch: true,
                        images: [{
                            uid: "rc-upload-1718881067288-2",
                            name: "Email_Etiquette.png"
                        }],
                        cover: {
                            uid: "rc-upload-1718881067288-2",
                                name: "Email_Etiquette.png"
                        }
                    }
                ]
            },
            'id-in-progress-1': {
                listId: 'id-in-progress-1',
                title: 'In Progress',
                    tasks: [
                        {
                            id: 'id-126-social-media-assets',
                            title: 'Social media assets',
                            isSearchMatch: true,
                            images: [{
                                uid: "rc-upload-1717665107147-2",
                                name: "jeremy-bezanger-oxrk8fg2aig-unsplash.jpg"
                            }],
                            cover: {
                                uid: "rc-upload-1717665107147-2",
                                name: "jeremy-bezanger-oxrk8fg2aig-unsplash.jpg"
                            }
                        },
                        {
                            id: 'id-125-sketch-site-banner',
                            title: 'Sketch site banner',
                            isSearchMatch: true
                        }
                    ]
            },
            'id-done-1': {
                listId: 'id-done-1',
                title: 'Completed',
                    tasks: [
                        {
                            id: 'id-129-freelancer-contracts',
                            title: 'Freelancer contracts',
                            isSearchMatch: true
                        },
                        {
                            id: 'id-129-project-proposal',
                            title: 'Project Proposal',
                            isSearchMatch: true,
                            images: [{
                                uid: "rc-upload-1718880041865-2",
                                name: "preview-page0.jpg"
                            }],
                            cover: {
                                uid: "rc-upload-1718880041865-2",
                                name: "preview-page0.jpg"
                            }
                        }
                ]
            }},
        order: ['id-todo-1', 'id-in-progress-1', 'id-done-1'],
        searchQuery: ''
    }, {
        current: false,
        id: '321-321-321',
        title: 'Remote Team',
        lists : {
            'id-todo-2': {
                listId: 'id-todo-2',
                title: 'Todo',
                tasks: [
                    {
                        id: 'id-125-working-hours',
                        title: 'Working Hours',
                        isSearchMatch: true
                    }
                ]
            },
            'id-in-progress-2': {
                listId: 'id-in-progress-2',
                title: 'In Progress',
                tasks: [
                    {
                        id: 'id-125-blog-redesign',
                        title: 'Blog Redesign',
                        isSearchMatch: true,
                        images: [{
                            uid: "rc-upload-1719227684487-2",
                            name: "10ways3.webp"
                        }],
                        cover: {
                            uid: "rc-upload-1719227684487-2",
                            name: "10ways3.webp"
                        }
                    }
                ]
            },
            'id-done-2': {
                listId: 'id-done-2',
                title: 'Completed',
                tasks: [
                    {
                        id: 'id-125-ebook-campaign',
                        title: 'Ebook Campaign',
                        isSearchMatch: true
                    }
                ]
            }
        },
        order: ['id-todo-2', 'id-in-progress-2', 'id-done-2'],
        searchQuery: ''
    }
]

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setCurrent: (state, action: PayloadAction<string>) => {
            state.forEach(board => {
                board.current = board.id === action.payload;
            })
        },
        resetCurrent: (state) => {
            state.forEach(board => {
                board.current = false;
            })
        },
        addBoard: (state, action: PayloadAction<string>) => {
            state.push({
                current: false,
                id: v4(),
                title: action.payload,
                lists : {
                    'id-todo-new': {
                        listId: 'id-todo-new',
                        title: 'Todo',
                        tasks: []
                    },
                    'id-in-progress-new': {
                        listId: 'id-in-progress-new',
                        title: 'In Progress',
                        tasks: []
                    },
                    'id-done-new': {
                        listId: 'id-done-new',
                        title: 'Completed',
                        tasks: []
                    }
                },
                order: ['id-todo-new', 'id-in-progress-new', 'id-done-new'],
                searchQuery: ''
            })
        },
        removeBoard: (state) => {
            return state.filter(board => !board.current)

        },
        addList: (state, action: PayloadAction<IAddListActionPayload>) => {
            const {id, title} = action.payload
            state.forEach(board => {
                if(board.current) {
                    board.lists[id] = {listId: id, title, tasks: []}
                    board.order.push(id)
                }
            })
        },
        removeListFromBoard: (state, action: PayloadAction<string>) => {
            state.forEach((board) => {
                if (board.current) {
                    Object.keys(board.lists).forEach((listKey) => {
                        if (board.lists[listKey].listId === action.payload) {
                            delete board.lists[listKey];
                        }
                    });
                    board.order = board.order.filter(item => item !== action.payload);
                }
            });
        },
        restoreList: (state, action: PayloadAction<IArchiveList>) => {
            const {listId, title, tasks, index} = action.payload
            state.forEach(board => {
                if (board.current) {
                    board.lists[listId] = {listId, title, tasks}
                    board.order.splice(index, 0, listId);
                }
            })
        },
        addCard: (state, action: PayloadAction<IAddCardActionPayload>) => {
            state.forEach(board => {
              if (board.current) {
                  board.lists[action.payload.listTitle].tasks.push(action.payload.cardItem)
              }
          })
        },
        moveCard: (state, action: PayloadAction<IMoveCardActionPayload>) => {
            state.forEach(board => {
              if (board.current) {
                  board.lists[action.payload.source.droppableId].tasks.splice(action.payload.source.index, 1)
                  board.lists[action.payload.destination.droppableId].tasks.splice(action.payload.destination.index, 0, action.payload.cardCopy)
              }
          })
        },
        editCard: (state, action: PayloadAction<IEditCardActionPayload>) => {
            state.forEach(board => {
              if (board.current) {
                  board.lists[action.payload.listTitle].tasks.forEach((task: ICard): void => {
                      if(task.id === action.payload.id) {
                          if(task.title !== action.payload.values.title) {
                              task.title = action.payload.values.title
                          }
                          if(task.description !== action.payload.values.description) {
                              task.description = action.payload.values.description
                          }
                      }
                  })
              }
            })
        },
        removeFromBoardCard: (state, action: PayloadAction<IRemoveFromBoardCardActionPayload>) => {
            const {id, listTitle} = action.payload;
            state.forEach(board => {
                if(board.current) {
                    const listToUpdate = board.lists[listTitle];
                    if (listToUpdate && listToUpdate.tasks) {
                        listToUpdate.tasks = listToUpdate.tasks.filter(task => task.id!== id);
                    }
                }
            })
        },
        restoreCard: (state, action: PayloadAction<IRestoreCardActionPayload>) => {
            state.forEach(board => {
                if (board.current) {
                    board.lists[action.payload.listId].tasks.splice(action.payload.index, 0, action.payload.cardItem);
                }
            })
        },
        addImage: (state, action: PayloadAction<IAddImageActionPayload>) => {
            state.forEach(board => {
                if (board.current) {
                    board.lists[action.payload.listTitle].tasks.forEach((task: ICard): void => {
                        if(task.id === action.payload.id) {
                            if(typeof task.images === "undefined") {
                                task.images = [];
                            }
                            task.images.push({uid: action.payload.file.uid, name: action.payload.file.name})
                        }
                    })
                }
            })
        },
        removeImage: (state, action: PayloadAction<IRemoveImageActionPayload>) => {
            state.forEach(board => {
                if (board.current) {
                    board.lists[action.payload.listTitle].tasks.forEach((task: ICard): void => {
                        if(task.id === action.payload.id) {
                            task.images = task.images?.filter(image => image.uid !== action.payload.imageId)
                            if(task.cover?.uid === action.payload.imageId) {
                                task.cover = undefined
                            }
                        }
                    })
                }
            })
        },
        setCoverImage: (state, action: PayloadAction<ISetCoverImageActionPayload>) => {
            state.forEach(board => {
                if (board.current) {
                    board.lists[action.payload.listTitle].tasks.forEach((task: ICard): void => {
                        if(task.id === action.payload.id) {
                            task.cover = action.payload.image
                        }
                    })
                }
            });
        },
        reorderLists: (state, action: PayloadAction<string[]>) => {
            state.forEach(board => {
                if (board.current) {
                    board.order = action.payload;
                }
            });
        },
        searchCards: (state, action: PayloadAction<string>) => {
            state.forEach(board => {
                if(board.current) {
                    board.searchQuery = action.payload;
                    Object.values(board.lists).forEach((list) => {
                        list.tasks = list.tasks.map(task => ({
                            ...task,
                            isSearchMatch: task.title.toLowerCase().includes(action.payload.toLowerCase())
                        }));
                    })
                }
            })
        },
    },
})


export const { setCurrent,
    resetCurrent,
    addBoard,
    removeBoard,
    addList,
    removeListFromBoard,
    restoreList,
    addCard,
    moveCard,
    editCard,
    removeFromBoardCard,
    restoreCard,
    addImage,
    removeImage,
    setCoverImage,
    reorderLists,
    searchCards} = boardSlice.actions;

export const selectBoards = (state: RootState) => state.board;
export const selectCurrentBoard = (state: RootState) => state.board.find(board => board.current);
export const selectCurrentBoardId = (state: RootState) => {
    const currentBoard = state.board.find(board => board.current);
    return currentBoard? currentBoard.id : '';
};
export const selectSearchQuery = (state: RootState) => {
    const currentBoard = state.board.find(board => board.current);
    return currentBoard? currentBoard.searchQuery : '';
};
export default boardSlice.reducer;