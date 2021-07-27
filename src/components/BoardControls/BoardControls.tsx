import React from "react";
import { StyledInput } from "../StyledInput/StyledInput";
import { onChangeNumberLimitFactory, onBlurSetMinimumFactory } from "../../shared/utils";
import { StyledButton } from "../StyledButton/StyledButton";
import { CenteredRow } from "../CenteredRow/CenteredRow";
import { TitledContainer } from "../TitledContainer/TitledContainer";
import { IBoardState } from "../../types/IBoardState.interface";

export interface IBoardControls {
  height: string;
  width: string;
  changeHeight: (value: string) => void;
  changeWidth: (value: string) => void;
  uploadBoard: (value: string) => void;
  loadBoard: (url_or_gameid: string, frame: string) => void;
  boardState: IBoardState;
}

interface IBoardControlsState {
  boardUploadString: string;
  url_or_gameid: string;
  frame: string;
}

export class BoardControls extends React.Component<IBoardControls, IBoardControlsState> {

  private boardCopyInput: HTMLInputElement | null = null;

  constructor(props: IBoardControls) {
    super(props);
    this.state = {
      url_or_gameid: "",
      boardUploadString: "",
      frame: "",
    }
  }

  public copyBoardState = () => {
    if (!this.boardCopyInput) {
      return;
    }
    this.boardCopyInput.select();
    document.execCommand("copy");
  }

  public uploadBoardState = () => {
    const { boardUploadString } = this.state;
    const { uploadBoard } = this.props;
    uploadBoard(boardUploadString);
  }

  public loadBoardState = () => {
    const { url_or_gameid, frame } = this.state;
    const { loadBoard } = this.props;
    loadBoard(url_or_gameid, frame);
  }

  public setBoardString = (value: string) => this.setState({ boardUploadString: value });
  public setUrlOrGameId = (value: string) => this.setState({ url_or_gameid: value });
  public setFrame = (value: string) => this.setState({ frame: value });

  render() {
    const { height, width, changeHeight, changeWidth, uploadBoard, boardState } = this.props;
    const boardString: string = JSON.stringify(boardState);
    return (
      <TitledContainer title="Board">
        <CenteredRow>
          <StyledInput title="Height" value={height} onBlur={onBlurSetMinimumFactory(changeHeight, 1)} onChange={onChangeNumberLimitFactory(changeHeight)} />
          <StyledInput title="Width" value={width} onBlur={onBlurSetMinimumFactory(changeWidth, 1)} onChange={onChangeNumberLimitFactory(changeWidth)} />
        </CenteredRow>
        <CenteredRow>
          <StyledInput placeholder="Paste Board JSON Here" onChange={event => this.setBoardString(event.target.value)} />
          <StyledButton onClick={this.uploadBoardState}>Upload</StyledButton>
        </CenteredRow>
        <CenteredRow>
          <StyledInput placeholder="Paste game URL or ID here" onChange={event => this.setUrlOrGameId(event.target.value)} />
          <StyledInput title="Frame" onChange={event => this.setFrame(event.target.value)} />
          <StyledButton onClick={this.loadBoardState}>Load</StyledButton>
        </CenteredRow>
        <CenteredRow>
          <StyledButton onClick={this.copyBoardState}>Copy Board State</StyledButton>
          <input tabIndex={-1} ref={ref => this.boardCopyInput = ref} type="text" readOnly value={boardString} style={{ position: "absolute", top: -10000 }} />
          <StyledButton href={"data:text/json;charset=utf-8," + encodeURIComponent(boardString)} download={`board-${boardState.game.id}.json`}>Download Board State</StyledButton>
        </CenteredRow>
      </TitledContainer>
    )

  }
}
