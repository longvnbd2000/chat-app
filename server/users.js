const users = [];

const getUser = id => {
    return users.find(user => user.id == id);
}

const getRoomUsers = room => {
    return users.find(user => user.room == room);
}

const addUser = ({id, name, room}) => {
    const checkUser = users.find(user => user.name == name && user.room == room);
    if (checkUser) {
        return { error: 'Username had been used'};
    }
    const user = { id, name, room};
    users.push(user);

    return {user};
}

const removeUser = id => {
    const index = users.findIndex(user => user.id == id);

    if(index != -1){
        const removedUser = users.splice(index, 1)[0];
        return removedUser;
    }
}

module.exports = {getUser, getRoomUsers, addUser, removeUser}