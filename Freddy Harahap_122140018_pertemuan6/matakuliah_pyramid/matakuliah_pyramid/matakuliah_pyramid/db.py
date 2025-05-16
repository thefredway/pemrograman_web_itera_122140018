from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker, scoped_session

from .models.meta import Base

# Create a session factory that's scoped for thread safety
DBSession = scoped_session(sessionmaker(autoflush=True, autocommit=False))

def includeme(config):
    settings = config.get_settings()
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine
    config.registry['dbsession_factory'] = DBSession

    def dbsession(request):
        session = DBSession()
        def cleanup(request):
            session.close()
        request.add_finished_callback(cleanup)
        return session

    config.add_request_method(dbsession, 'dbsession', reify=True)
