const { Block } = require("./Block");

class SectionBlock extends Block {
  constructor(template, variableMap = {}, markdown = true) {
    super();
    
    this.template = template;
    this.variableMap = variableMap;
    this.markdown = markdown;
  }

  render() {
    let block = null;
    let replacedText = this.template.slice();

    for (const [key, value] of Object.entries(this.variableMap)) {
      replacedText = replacedText.replace(`{${key}}`, value);
    }

    return {
      type: "section",
      text: {
        type: this.markdown ? "mrkdwn" : "plain_text",
        text: replacedText,
      },
    };
  }
}

exports.SectionBlock = SectionBlock;
