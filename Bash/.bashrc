#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

alias ls='ls --color=auto'
alias grep='grep --color=auto'
PS1='[\u@\h \W]\$ '

if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi

export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
export REACT_EDITOR=code
export PATH="$PATH:$(npm -g bin)"

export PATH="/usr/bin:$PATH"

# PS1='\033[1;36m\]\[[\W] ~ \033[00m\]'

PS1='> '

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
export XDG_CONFIG_HOME=$HOME/.config
alias HyprUware="/opt/HyprUware/bin/HyprUware"

bind '"^H": backward-kill-word'

export MOZ_ENABLE_WAYLAND=1

