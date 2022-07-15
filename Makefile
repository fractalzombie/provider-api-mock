.DEFAULT_GOAL := help
.PHONY: help

APP_NAME ?= "api-mock"
KEYS := build exec

define LOOP_BODY
  ifneq ($$(filter $$(KEYS),$(v)),)
    RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
    $(eval $(RUN_ARGS):;@:)
  endif
endef

$(foreach v,$(firstword $(MAKECMDGOALS)),$(eval $(LOOP_BODY)))

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

start: ## start-clear - Run the project at clear point.
	docker-compose -f docker-compose.yml -p $(APP_NAME) stop
	docker-compose -f docker-compose.yml -p $(APP_NAME) rm -f
	docker-compose -f docker-compose.yml -p $(APP_NAME) up -d --build --force-recreate

stop: ## stop - Stop the project.
	docker-compose -f docker-compose.yml -p $(APP_NAME) stop
	docker-compose -f docker-compose.yml -p $(APP_NAME) rm -f

exec: ## exec - Exec command in container by name.
	docker-compose -p $(APP_NAME) exec $(RUN_ARGS)

%:
@:
