from app.database import SessionLocal, engine, Base
from app import models, crud, schemas
from app.auth import get_password_hash
def run():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    # create demo user
    try:
        user = crud.get_user_by_username(db, 'demo')
    except:
        user = None
    if not user:
        class U: pass
        u = schemas.UserCreate(username='demo', email='demo@example.com', password='password', full_name='Demo User')
        crud.create_user(db, u)
    # add sample heritage
    try:
        sites = crud.list_heritage(db)
    except:
        sites = []
    if not sites:
        s = schemas.HeritageSiteCreate(title='شارع الأجداد', description='موقع تاريخي تم اعادة بنائه رقميا', lat=31.77, lon=35.21, status='restored', glb_url='')
        crud.create_heritage_site(db, s)
    print('Seeding done.')
if __name__ == '__main__':
    run()