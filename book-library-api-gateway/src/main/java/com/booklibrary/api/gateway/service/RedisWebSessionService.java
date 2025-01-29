package com.booklibrary.api.gateway.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.session.WebSessionManager;

@Service
@Slf4j
public class RedisWebSessionService {

  private final WebSessionManager webSessionManager;

  public RedisWebSessionService(WebSessionManager webSessionManager) {
    this.webSessionManager = webSessionManager;
  }

  public void clearWebSession( ServerWebExchange exchange) {

    webSessionManager.getSession(exchange)
        .doOnSuccess((webSession -> {
      if(webSession !=null) {
        //Work around to break the session between UI and Gateway
        webSession.changeSessionId().subscribe();
        log.info("Web session id changed");
        webSession.invalidate().subscribe();
        log.info("Web session invalidated");

      }
    })).subscribe();
  }
}
