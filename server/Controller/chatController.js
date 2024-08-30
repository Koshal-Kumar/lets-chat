import Chat from "../modals/chatModal.js";
import User from "../modals/userModal.js";

export const accessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("userId missing with the Request");
    return res.status(404).send({ message: "userId missing with the Request" });
  }

  try {
    var isChat = await Chat.find({
      isGroupChat: false,
      users: { $all: [req.user._id, userId] },
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name email picture",
    });

    if (isChat.length > 0) {
      res.status(200).send({ data: isChat[0] });
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };

      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat.id }).populate(
        "users",
        "-password"
      );
      res.status(200).send({ data: fullChat });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const fetchChats = async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
    .populate('users','-password')
    .populate('groupAdmin', '-password')
    .populate('latestMessage')
    .sort({updatedAt : -1})
    .then(async(results) =>{
        results = await User.populate(results,{
            path : 'latestMessage.sender',
            select :  'name email picture'
        })
    res.status(200).send({data: results});

    }
    );

  } catch (error) {
    console.log(error.message);
  }
};


export const createGroupChat = async (req, res) => {
    if(!req.body.users || !req.body.name){
        return res.status(400).send({message: 'fill the required feilds'})
    }
    var users= JSON.parse(req.body.users);

    if(users.length<2){
        return res.status(400).send("MOre than 2 users are requied for group chat")
    }

    users.push(req.user)

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users : users,
            isGroupChat : true,
            groupAdmin: req.user

        })

        const fullGroupChat = await Chat.findOne({
            _id : groupChat._id
        }).populate("users", "-password")
        .populate("groupAdmin", "-password")

        res.status(200).json(fullGroupChat)
    } catch (error) {
        res.status(400);
        console.log(error.message)
    }

}