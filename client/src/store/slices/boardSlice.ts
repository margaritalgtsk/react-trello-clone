import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {IBoardState, ICard, IDraggableProps, IEditFormValues} from "../../types/types";
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
        title: 'Start Board',
        lists: {
            'todo': {
                title: 'Todo',
                tasks: [
                    {
                        id: 'id-123-feed-the-cat',
                        title: 'feed the cat',
                        isSearchMatch: true
                    },
                    {
                        id: 'id-124-feed-the-dog',
                        title: 'feed the dog',
                        isSearchMatch: true,
                        images: [{
                            uid: "rc-upload-1716805931623-2",
                            name: "dog.jpg"
                        }],
                        cover: {
                            uid: "rc-upload-1716805931623-2",
                                name: "dog.jpg"
                        }
                    }
                ]
            },
            'in-progress': {
                title: 'In Progress',
                    tasks: [
                        {
                            id: 'id-125-feed-the-parrot',
                            title: 'feed the parrot',
                            isSearchMatch: true
                        },
                        {
                            id: 'id-126-feed-the-turtle',
                            title: 'feed the turtle',
                            isSearchMatch: true,
                            images: [{
                                uid: "rc-upload-1717665107147-2",
                                name: "turtle.jpeg"
                            }],
                            cover: {
                                uid: "rc-upload-1717665107147-2",
                                name: "turtle.jpeg"
                            }
                        }
                    ]
            },
            'done': {
                title: 'Completed',
                    tasks: [
                        {
                            id: 'id-127-feed-the-mouse',
                            title: 'feed the mouse',
                            isSearchMatch: true
                        },
                        {
                            id: 'id-129-feed-the-dingo',
                            title: 'feed the dingo',
                            isSearchMatch: true
                        }
                ]
            }},
        order: ['todo', 'in-progress', 'done'],
        searchQuery: ''
    }, {
        current: false,
        id: '321-321-321',
        title: 'New Board',
        lists : {
            'todo': {
                title: 'Todo',
                tasks: [
                    {
                        id: 'id-125-feed-the-parrot',
                        title: 'feed the parrot',
                        isSearchMatch: true,
                        images: [{
                            uid: "rc-upload-1718804008576-2",
                            name: "parrot.webp"
                        }],
                        cover: {
                            uid: "rc-upload-1718804008576-2",
                            name: "parrot.webp"
                        }
                    }
                ]
            },
            'in-progress': {
                title: 'In Progress',
                tasks: []
            },
            'done': {
                title: 'Completed',
                tasks: []
            }
        },
        order: ['todo', 'in-progress', 'done'],
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
        addBoard: (state, action: PayloadAction<any>) => {
            state.push({
                current: false,
                id: v4(),
                title: action.payload.title,
                lists : {
                    'todo': {
                        title: 'Todo',
                        tasks: []
                    },
                    'in-progress': {
                        title: 'In Progress',
                        tasks: []
                    },
                    'done': {
                        title: 'Completed',
                        tasks: []
                    }
                },
                order: ['todo', 'in-progress', 'done'],
                searchQuery: ''
            })
        },
        addList: (state, action: PayloadAction<IAddListActionPayload>) => {
            const {id, title} = action.payload
            state.forEach(board => {
                if(board.current) {
                    board.lists[id] = {title, tasks: []}
                    board.order.push(id)
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
                    board.lists[action.payload.listTitle].tasks.splice(action.payload.index, 0, action.payload.cardItem);
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


export const { setCurrent, resetCurrent, addBoard, addList,
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