const { Block } = require("./Block");

class ButtonBlock extends Block {
  constructor(text, actionId, value) {
    super();
    
    this.text = text;
    this.actionId = actionId;
    this.value = value;
  }

  render() {
    return {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: this.text,
          },
          value: this.value,
          action_id: this.actionId,
        },
      ],
    };
  }
}

exports.ButtonBlock = ButtonBlock;
